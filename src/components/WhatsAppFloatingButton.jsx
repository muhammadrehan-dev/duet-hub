import styles from './WhatsAppFloatingButton.module.css'

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/F4yv2EhgqJb8mqwmYOC32V?s=sw&p=a&ilr=0'

export default function WhatsAppFloatingButton() {
  return (
    <div className={styles.floatingContainer}>
      <span className={styles.pulseEffect} aria-hidden="true" />
      <a
        href={WHATSAPP_GROUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
        aria-label="Any queries? Contact us on WhatsApp"
        title="Any queries? Join WhatsApp Group"
      >
        <span className={styles.iconWrapper}>
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.98-.276-.1-.476-.15-.676.15-.2.301-.776.98-.952 1.18-.175.201-.351.226-.652.075-.3-.15-1.266-.467-2.412-1.488-.891-.796-1.493-1.778-1.668-2.08-.176-.3-.019-.462.132-.612.136-.134.301-.351.451-.527.151-.175.2-.3.301-.5.1-.201.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.233-.244-.588-.492-.508-.676-.517l-.576-.01c-.2 0-.526.075-.801.376-.276.301-1.052 1.028-1.052 2.507 0 1.479 1.077 2.908 1.228 3.109.15.2 2.12 3.237 5.136 4.54.717.31 1.277.496 1.713.635.72.229 1.375.197 1.894.12.578-.087 1.782-.728 2.032-1.43.25-.703.25-1.304.175-1.43-.075-.126-.275-.201-.576-.351zM12.04 2C6.52 2 2.036 6.484 2.036 12c0 1.956.564 3.784 1.542 5.334L2 22l4.809-1.528C8.28 21.365 10.098 22 12.04 22c5.52 0 10.004-4.484 10.004-10S17.56 2 12.04 2zm0 18.232c-1.708 0-3.32-.486-4.697-1.328l-.337-.205-2.857.907.925-2.784-.225-.357A8.163 8.163 0 0 1 3.864 12c0-4.508 3.668-8.176 8.176-8.176 4.508 0 8.176 3.668 8.176 8.176 0 4.508-3.668 8.232-8.176 8.232z" />
          </svg>
        </span>
        <span className={styles.text}>Any queries?</span>
      </a>
    </div>
  )
}
