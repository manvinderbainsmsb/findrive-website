const WHATSAPP_NUMBER = '919876543210'
const WHATSAPP_MESSAGE = encodeURIComponent("Hi FinDrive, I'd like to know more about car financing.")

export default function WhatsAppCta() {
  return (
    <section className="bg-green-50 border-y border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        <p className="text-sm sm:text-base font-medium text-brand-dark">
          Prefer to chat? Connect with us on WhatsApp for quick answers.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2 text-sm font-bold text-white shadow hover:bg-green-700 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.43 5.13L2 22l5.13-1.53a9.86 9.86 0 0 0 4.91 1.31h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 17.95h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.04.9.91-2.97-.2-.31a8.2 8.2 0 0 1-1.27-4.43c0-4.53 3.69-8.22 8.23-8.22 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.82c0 4.53-3.69 8.13-8.37 8.13zm4.49-6.13c-.25-.12-1.45-.71-1.67-.8-.22-.08-.39-.12-.55.13-.16.24-.63.79-.78.95-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.02-.39.11-.51.13-.13.29-.33.43-.5.14-.16.19-.28.28-.46.1-.18.05-.34-.02-.46-.07-.13-.55-1.31-.75-1.8-.2-.49-.4-.43-.55-.43-.14 0-.31-.02-.47-.02-.16 0-.42.06-.65.31-.22.25-.86.84-.86 2.04 0 1.2.88 2.36 1 2.53.12.16 1.71 2.6 4.14 3.55 2.43.94 2.43.63 2.87.59.43-.04 1.45-.59 1.66-1.17.2-.57.2-1.06.14-1.17-.06-.11-.23-.18-.48-.3z" />
          </svg>
          Chat on WhatsApp
        </a>
      </div>
    </section>
  )
}
