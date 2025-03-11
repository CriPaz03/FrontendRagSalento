import { PROMPT, PROMPT_DICT } from "@/src/app/model-helpers";

const GroupsPrompt = ({ setPrompt, prompt }: { setPrompt: (a: PROMPT) => void, prompt: number }) => {
  return (
    <div className="inline-flex rounded-md shadow-xs w-full justify-center">
      {
        Object.values(PROMPT_DICT).map((p, i) => (
          <a
            key={i}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPrompt(i as PROMPT);
            }}
            className={`px-4 py-2 text-sm font-medium ${
              prompt === i ? 'text-blue-700 bg-white' : 'text-gray-900 bg-white'
            } ${
              i === 0 
                ? 'rounded-s-lg border' 
                : i === 3 
                  ? 'rounded-e-lg border' 
                  : 'border-t border-b'
            } border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700`}
          >
            Prompt {i + 1}
          </a>
        ))}
    </div>
  )
}

export default GroupsPrompt;