import IconBtn from "./IconBtn"

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-auto bg-black bg-opacity-60">
      <div className="w-11/12 max-w-sm rounded-lg border border-gray-700 bg-gray-800 p-6">
        <p className="text-2xl font-semibold text-white">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 text-gray-300">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <IconBtn
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            className="bg-gray-700 text-white hover:bg-gray-600"
          />
          <button
            className="cursor-pointer rounded-md bg-gray-600 py-2 px-4 font-semibold text-white hover:bg-gray-500"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}
