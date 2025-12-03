import { useForm } from "react-hook-form";
import SectionCard from "../components/SectionCard";

interface WizardFormValues {
  tone: string;
  highlight: string;
}

export default function CoverLetterWizard() {
  const { register, handleSubmit, watch } = useForm<WizardFormValues>({
    defaultValues: { tone: "professional", highlight: "" }
  });

  const onSubmit = (values: WizardFormValues) => {
    console.log("Would call /resume/optimize for cover letter", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SectionCard title="Tone" description="Select the voice for your cover letter.">
        <select {...register("tone")} className="rounded-lg border border-slate-300 p-3">
          <option value="professional">Professional</option>
          <option value="enthusiastic">Enthusiastic</option>
          <option value="concise">Concise</option>
        </select>
      </SectionCard>

      <SectionCard title="Key Achievement" description="Add a highlight you want the AI to emphasize.">
        <input
          {...register("highlight")}
          className="w-full rounded-lg border border-slate-300 p-3"
          placeholder="Scaled onboarding funnel to 10k users in 6 months"
        />
      </SectionCard>

      <SectionCard title="Preview">
        <p className="whitespace-pre-wrap text-sm text-slate-700">
          {`Dear Hiring Manager,\n\nI am excited to apply...\nKey highlight: ${watch("highlight") || "Provide a highlight"}.`}
        </p>
        <button type="submit" className="button-primary">
          Generate Draft
        </button>
      </SectionCard>
    </form>
  );
}
