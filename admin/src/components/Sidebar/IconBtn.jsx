export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses = '',
  type = 'button',
}) {
  return (
      <button
          disabled={disabled}
          onClick={onclick}
          className={`flex items-center ${
              outline
                  ? "border border-gray-500 bg-transparent text-gray-300"  // Outline button with dark theme
                  : "bg-gray-700 text-white"  // Solid button with dark theme
          } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold ${customClasses}`}
          type={type}
      >
          {children ? (
              <>
                  <span className={`${outline ? "text-gray-300" : ""}`}>{text}</span>
                  {children}
              </>
          ) : (
              text
          )}
      </button>
  );
}
