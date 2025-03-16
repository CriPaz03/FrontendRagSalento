import { PROMPT, PROMPT_DICT } from "@/src/app/model-helpers";

const GroupsPrompt = ({ setPrompt, prompt }: { setPrompt: (a: PROMPT) => void, prompt: string }) => {
  return (
    <div className="inline-flex rounded-md shadow-xs w-full justify-center">
      {
        Object.entries(PROMPT_DICT).map(([key, value], i) => (
          <a
            key={i}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPrompt(key as PROMPT);
            }}
            className={`px-4 py-2 text-sm font-medium ${
              prompt === key ? 'text-blue-700 bg-white' : 'text-gray-900 bg-white'
            } ${
              i === 0 
                ? 'rounded-s-lg border' 
                : i === Object.keys(PROMPT_DICT).length - 1
                  ? 'rounded-e-lg border-r border-t border-b' 
                  : 'border-t border-b border-r'
            } border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700`}
          >
            {key}
          </a>
        ))}
    </div>
  )
}

export default GroupsPrompt;