"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Sparkles, AlertCircle } from "lucide-react";
import { skinConcerns, hairConcerns, wellnessConcerns, Concern } from "@/recommendation-engine/concerns";

type Category = "SKIN" | "HAIR" | "WELLNESS";

interface ProblemFinderState {
  step: 1 | 2 | 3 | 4;
  category: Category | null;
  selectedConcerns: string[];
  skinType: string;
  hairType: string;
  freeText: string;
}

const categoryOptions: { value: Category; label: string; emoji: string; description: string }[] = [
  {
    value: "SKIN",
    label: "Skin",
    emoji: "✨",
    description: "Face, body, and general skincare concerns",
  },
  {
    value: "HAIR",
    label: "Hair",
    emoji: "🌾",
    description: "Scalp, hair care, and hair treatment needs",
  },
  {
    value: "WELLNESS",
    label: "Wellness",
    emoji: "🌸",
    description: "Bathing rituals, body care and lip care",
  },
];

const skinTypes = [
  { value: "", label: "Not sure / Skip" },
  { value: "oily", label: "Oily" },
  { value: "dry", label: "Dry" },
  { value: "combination", label: "Combination" },
  { value: "sensitive", label: "Sensitive" },
  { value: "normal", label: "Normal" },
];

const hairTypes = [
  { value: "", label: "Not sure / Skip" },
  { value: "dry", label: "Dry" },
  { value: "oily", label: "Oily" },
  { value: "damaged", label: "Damaged" },
  { value: "normal", label: "Normal" },
];

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`step-dot ${i + 1 < current ? "completed" : ""} ${i + 1 === current ? "active" : ""}`}
          aria-hidden="true"
        />
      ))}
      <span className="text-forest/50 text-xs font-body ml-1">
        Step {current} of {total}
      </span>
    </div>
  );
}

export default function ProblemFinder() {
  const router = useRouter();
  const [state, setState] = useState<ProblemFinderState>({
    step: 1,
    category: null,
    selectedConcerns: [],
    skinType: "",
    hairType: "",
    freeText: "",
  });
  const [error, setError] = useState("");

  const concerns: Concern[] =
    state.category === "SKIN"
      ? skinConcerns
      : state.category === "HAIR"
      ? hairConcerns
      : wellnessConcerns;

  const totalSteps = 4;

  const handleCategorySelect = (cat: Category) => {
    setState((s) => ({ ...s, category: cat, selectedConcerns: [] }));
    setError("");
  };

  const handleConcernToggle = (concernId: string) => {
    setState((s) => ({
      ...s,
      selectedConcerns: s.selectedConcerns.includes(concernId)
        ? s.selectedConcerns.filter((c) => c !== concernId)
        : [...s.selectedConcerns, concernId],
    }));
    setError("");
  };

  const handleNext = () => {
    if (state.step === 1 && !state.category) {
      setError("Please select a category to continue.");
      return;
    }
    if (state.step === 2 && state.selectedConcerns.length === 0 && !state.freeText.trim()) {
      setError("Please select at least one concern or describe your routine needs.");
      return;
    }
    setError("");
    setState((s) => ({ ...s, step: Math.min(s.step + 1, totalSteps) as 1 | 2 | 3 | 4 }));
  };

  const handleBack = () => {
    setError("");
    setState((s) => ({ ...s, step: Math.max(s.step - 1, 1) as 1 | 2 | 3 | 4 }));
  };

  const handleSubmit = () => {
    // Sanitize free text before encoding
    const sanitizedText = state.freeText
      .replace(/[<>]/g, "")
      .trim()
      .slice(0, 500);

    const params = new URLSearchParams({
      category: state.category || "",
      concerns: state.selectedConcerns.join(","),
      skinType: state.skinType,
      hairType: state.hairType,
      freeText: sanitizedText,
    });

    router.push(`/recommendations?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-cream-light">
      {/* Header */}
      <div
        className="pt-28 pb-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #1C3A2B 0%, #2D5A3D 100%)",
        }}
      >
        <div className="container-brand text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
            <span className="text-gold text-xs font-medium uppercase tracking-wider font-body">
              Personalised Matching
            </span>
          </div>
          <h1 className="text-display-xl font-display font-bold text-cream mb-4">
            Problem Finder
          </h1>
          <p className="text-cream/60 font-body max-w-lg mx-auto mb-2">
            Tell us your concern and we&apos;ll match you with the right Thulir product from our catalogue.
          </p>
          <p className="text-cream/35 text-xs font-body">
            Rule-based matching · Real products only · No account needed
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="container-brand py-4">
        <div
          className="flex items-start gap-3 p-4 rounded-xl border border-gold/30 bg-gold/5"
          role="note"
          aria-label="Important disclaimer"
        >
          <AlertCircle className="w-4 h-4 text-earth shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-earth text-xs font-body leading-relaxed">
            <strong>Disclaimer:</strong> The Problem Finder provides product suggestions based on
            your selected concerns and personal-care routine preferences. It does not constitute
            medical advice, diagnosis, or treatment. For skin or health conditions, please consult
            a qualified professional. All Thulir Organics products are for cosmetic use only.
          </p>
        </div>
      </div>

      {/* Questionnaire */}
      <div className="container-brand py-8">
        <div className="max-w-2xl mx-auto">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-8">
            <StepIndicator current={state.step} total={totalSteps} />
            {state.step > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 text-forest/60 text-sm font-body hover:text-forest transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded"
                aria-label="Go back to previous step"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back
              </button>
            )}
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-body mb-6"
            >
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              {error}
            </div>
          )}

          {/* ─── STEP 1: Category ─────────────────────────────── */}
          {state.step === 1 && (
            <fieldset>
              <legend className="font-display font-bold text-forest mb-2 block"
                style={{ fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)" }}>
                What would you like help with?
              </legend>
              <p className="text-forest/55 font-body text-sm mb-8">
                Choose the area you&apos;d like to focus on.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {categoryOptions.map((opt) => (
                  <button
                    key={opt.value}
                    id={`category-${opt.value.toLowerCase()}`}
                    onClick={() => handleCategorySelect(opt.value)}
                    className={`group p-6 rounded-card-xl border-2 text-left transition-all duration-200 focus-visible:ring-2 focus-visible:ring-gold ${
                      state.category === opt.value
                        ? "border-forest bg-forest text-cream shadow-card"
                        : "border-beige bg-white text-forest hover:border-forest/40 hover:shadow-card"
                    }`}
                    aria-pressed={state.category === opt.value}
                  >
                    <div className="text-4xl mb-4" aria-hidden="true">{opt.emoji}</div>
                    <h3 className={`font-display font-bold text-xl mb-1.5 ${state.category === opt.value ? "text-cream" : "text-forest"}`}>
                      {opt.label}
                    </h3>
                    <p className={`text-sm font-body leading-snug ${state.category === opt.value ? "text-cream/70" : "text-forest/55"}`}>
                      {opt.description}
                    </p>
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {/* ─── STEP 2: Concerns ─────────────────────────────── */}
          {state.step === 2 && state.category && (
            <div>
              <h2 className="font-display font-bold text-forest mb-2"
                style={{ fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)" }}>
                What&apos;s your concern?
              </h2>
              <p className="text-forest/55 font-body text-sm mb-6">
                Select all that apply. You can also describe your needs below.
              </p>

              {/* Concern chips */}
              <fieldset className="mb-6">
                <legend className="sr-only">Select your concerns</legend>
                <div className="flex flex-wrap gap-2.5">
                  {concerns.map((concern) => (
                    <button
                      key={concern.id}
                      id={`concern-${concern.id}`}
                      onClick={() => handleConcernToggle(concern.id)}
                      className={`concern-chip ${
                        state.selectedConcerns.includes(concern.id) ? "selected" : ""
                      }`}
                      aria-pressed={state.selectedConcerns.includes(concern.id)}
                    >
                      {concern.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Free text */}
              <div className="mb-4">
                <label
                  htmlFor="free-text-input"
                  className="block text-forest/60 text-sm font-body font-medium mb-2"
                >
                  Or describe in your own words (optional):
                </label>
                <textarea
                  id="free-text-input"
                  value={state.freeText}
                  onChange={(e) => setState((s) => ({ ...s, freeText: e.target.value }))}
                  placeholder="e.g. My skin feels very dry and dull lately. Looking for something natural to use every day."
                  rows={3}
                  maxLength={500}
                  className="w-full p-4 bg-white border-2 border-beige rounded-xl text-forest placeholder:text-forest/35 focus:outline-none focus:border-forest-mid transition-colors text-sm font-body resize-none"
                  aria-describedby="free-text-hint"
                />
                <p id="free-text-hint" className="text-forest/35 text-xs font-body mt-1">
                  {state.freeText.length}/500 characters. We extract keywords to match products.
                </p>
              </div>
            </div>
          )}

          {/* ─── STEP 3: Preferences ──────────────────────────── */}
          {state.step === 3 && (
            <div>
              <h2 className="font-display font-bold text-forest mb-2"
                style={{ fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)" }}>
                A little more about you
              </h2>
              <p className="text-forest/55 font-body text-sm mb-8">
                Optional — helps us refine your match. You can skip these.
              </p>

              <div className="space-y-6">
                {(state.category === "SKIN" || state.category === "WELLNESS") && (
                  <fieldset>
                    <legend className="block text-forest font-body font-semibold text-sm mb-3">
                      What&apos;s your skin type?
                    </legend>
                    <div className="flex flex-wrap gap-2.5">
                      {skinTypes.map((st) => (
                        <button
                          key={st.value}
                          id={`skin-type-${st.value || "skip"}`}
                          onClick={() => setState((s) => ({ ...s, skinType: st.value }))}
                          className={`concern-chip ${state.skinType === st.value ? "selected" : ""}`}
                          aria-pressed={state.skinType === st.value}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}

                {state.category === "HAIR" && (
                  <fieldset>
                    <legend className="block text-forest font-body font-semibold text-sm mb-3">
                      What&apos;s your hair type?
                    </legend>
                    <div className="flex flex-wrap gap-2.5">
                      {hairTypes.map((ht) => (
                        <button
                          key={ht.value}
                          id={`hair-type-${ht.value || "skip"}`}
                          onClick={() => setState((s) => ({ ...s, hairType: ht.value }))}
                          className={`concern-chip ${state.hairType === ht.value ? "selected" : ""}`}
                          aria-pressed={state.hairType === ht.value}
                        >
                          {ht.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}
              </div>
            </div>
          )}

          {/* ─── STEP 4: Review & Submit ──────────────────────── */}
          {state.step === 4 && (
            <div>
              <h2 className="font-display font-bold text-forest mb-2"
                style={{ fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)" }}>
                Ready to find your match?
              </h2>
              <p className="text-forest/55 font-body text-sm mb-8">
                Here&apos;s a summary of what you shared. Click &ldquo;Find My Products&rdquo; to get your recommendation.
              </p>

              {/* Summary card */}
              <div className="p-6 rounded-card-xl border border-beige bg-white mb-8 space-y-4">
                <div>
                  <p className="text-forest/50 text-xs font-body uppercase tracking-wider mb-1.5">Area</p>
                  <p className="font-body font-semibold text-forest capitalize">
                    {state.category?.toLowerCase()}
                  </p>
                </div>

                {state.selectedConcerns.length > 0 && (
                  <div>
                    <p className="text-forest/50 text-xs font-body uppercase tracking-wider mb-1.5">
                      Selected concerns
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {state.selectedConcerns.map((id) => {
                        const c = [...skinConcerns, ...hairConcerns, ...wellnessConcerns].find(
                          (x) => x.id === id
                        );
                        return (
                          <span
                            key={id}
                            className="px-2.5 py-1 rounded-full bg-forest/10 text-forest text-xs font-body"
                          >
                            {c?.label || id}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {state.freeText && (
                  <div>
                    <p className="text-forest/50 text-xs font-body uppercase tracking-wider mb-1.5">
                      Your description
                    </p>
                    <p className="text-forest/70 text-sm font-body italic">
                      &ldquo;{state.freeText.slice(0, 200)}{state.freeText.length > 200 ? "..." : ""}&rdquo;
                    </p>
                  </div>
                )}

                {(state.skinType || state.hairType) && (
                  <div>
                    <p className="text-forest/50 text-xs font-body uppercase tracking-wider mb-1.5">
                      {state.skinType ? "Skin type" : "Hair type"}
                    </p>
                    <p className="text-forest/70 text-sm font-body capitalize">
                      {state.skinType || state.hairType}
                    </p>
                  </div>
                )}
              </div>

              <button
                id="submit-problem-finder"
                onClick={handleSubmit}
                className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-gold text-forest font-bold rounded-full hover:bg-gold-light transition-all duration-300 hover:shadow-premium hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-forest text-base"
              >
                <Sparkles className="w-5 h-5" aria-hidden="true" />
                Find My Products
                <ArrowRight className="w-4.5 h-4.5" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          {state.step < 4 && (
            <div className="mt-10">
              <button
                id={`step-${state.step}-next-btn`}
                onClick={handleNext}
                className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 bg-forest text-cream font-semibold rounded-full hover:bg-forest-mid transition-all duration-300 hover:shadow-card focus-visible:ring-2 focus-visible:ring-gold text-base"
              >
                Continue
                <ArrowRight className="w-4.5 h-4.5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
