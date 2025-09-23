import Image from "next/image";
import styles from "@/styles/home.module.css";
import cardStyles from "@/styles/cardsSection.module.css";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Background image */}
        <div className={styles.heroBg}>
          <Image
            src="/herobg.png"
            alt="Background pattern"
            fill
            priority
            className={styles.bgImage}
          />
        </div>

        {/* Content container */}
        <div className={styles.heroContent}>
          {/* Left side text */}
          <div className={styles.left}>
            <h1>
              Simplify Photo Sharing with <br />
              Powerful Digital Album Solution
            </h1>
            <p>
              <button className={styles.uploadBtn}>Upload</button> Memories
              Effortlessly <br />
              <em>Anytime, Anywhere.</em>
            </p>

            <div className={styles.storeBtns}>
              <div className={styles.buttons}>
                <div>
                  <p>Download it on</p>
                  <p>App Store</p>
                </div>
                <div>
                  <Image
                    src="/apple-log.svg"
                    alt="Download on the App Store"
                    width={40}
                    height={40}
                  />
                </div>
              </div>

              <div className={styles.buttons}>
                <div>
                  <p>Get it on</p>
                  <p>Google Play</p>
                </div>
                <div>
                  <Image
                    src="/playstore-logo.svg"
                    alt="Get it on Google Play"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className={styles.right}>
            {/* Mobile */}
            <div className={styles.mobileWrapper}>
              <Image
                src="/mobile.svg"
                alt="Mobile Mockup"
                width={500}
                height={500}
                className={styles.mobileImg}
              />

              {/* Floating cards */}
              <div className={`${styles.card} ${styles.cardTop}`}>
                Invite Participants Easily
              </div>

              <div className={`${styles.card} ${styles.cardMiddle}`}>
                Analytics For Photo Views & Downloads
              </div>

              <div className={`${styles.card} ${styles.cardBottom}`}>
                Create Personal or Public Groups
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className={cardStyles.cardsContainer}>
        {/* Top Row Cards */}
        <div className={cardStyles.cardRow}>
          {/* Card 1: Facial Recognition */}
          <div className={`${cardStyles.card} ${cardStyles.topCard}`}>
            <div className={cardStyles.cardHeader}>
              <h3>Facial Recognition</h3>
              <div className={cardStyles.arrowIcon}>
                <Image
                  src="/arrow-up-right.svg"
                  alt="Arrow icon"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <p>
              Automatically Find Your Photos With Smart Facial Recognition—No
              Endless Scrolling.
            </p>
            <div className={cardStyles.cardIcon}>
              <Image
                src="/face-recognition-icon.svg"
                alt="Facial Recognition Icon"
                width={80}
                height={80}
              />
            </div>
          </div>

          {/* Card 2: Quality Retention */}
          <div className={`${cardStyles.card} ${cardStyles.topCard}`}>
            <div className={cardStyles.cardHeader}>
              <h3>Quality Retention</h3>
              <div className={cardStyles.arrowIcon}>
                <Image
                  src="/arrow-up-right.svg"
                  alt="Arrow icon"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <p>
              Keep your photos sharp and clear without losing quality after
              upload.
            </p>
            <div className={cardStyles.cardIcon}>
              <Image
                src="/quality-retention-icon.svg"
                alt="Quality Retention Icon"
                width={80}
                height={80}
              />
            </div>
          </div>

          {/* Card 3: Unlimited Event Groups */}
          <div className={`${cardStyles.card} ${cardStyles.topCard}`}>
            <div className={cardStyles.cardHeader}>
              <h3>Unlimited Event Groups</h3>
              <div className={cardStyles.arrowIcon}>
                <Image
                  src="/arrow-up-right.svg"
                  alt="Arrow icon"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <p>
              Organize memories with unlimited event groups for every occasion.
            </p>
            <div className={cardStyles.cardIcon}>
              <Image
                src="/event-groups-icon.svg"
                alt="Event Groups Icon"
                width={80}
                height={80}
              />
            </div>
          </div>
        </div>

        {/* Bottom Row Cards */}
        <div className={cardStyles.cardRow}>
          {/* Card 4: 15K Active Users */}
          <div className={`${cardStyles.card} ${cardStyles.bottomCard}`}>
            <div className={cardStyles.bottomCardContent}>
              <div className={cardStyles.bottomCardIcon}>
                <Image
                  src="/active-user-icon.svg"
                  alt="Active User Icon"
                  width={40}
                  height={40}
                />
              </div>
              <h2>15K</h2>
              <p>Active Users On App</p>
            </div>
          </div>

          {/* Card 5: 1M Photos Upload & Share */}
          <div className={`${cardStyles.card} ${cardStyles.bottomCard}`}>
            <div className={cardStyles.bottomCardContent}>
              <div className={cardStyles.bottomCardIcon}>
                <Image
                  src="/photos-upload-share-icon.svg"
                  alt="Photos Upload & Share Icon"
                  width={40}
                  height={40}
                />
              </div>
              <h2>1M</h2>
              <p>Photos Uploaded & Shared</p>
            </div>
          </div>

          {/* Card 6: 99% Accuracy */}
          <div className={`${cardStyles.card} ${cardStyles.bottomCard}`}>
            <div className={cardStyles.bottomCardContent}>
              <div className={cardStyles.bottomCardIcon}>
                <Image
                  src="/accuracy-icon.svg"
                  alt="Accuracy Icon"
                  width={40}
                  height={40}
                />
              </div>
              <h2>99%</h2>
              <p>Face Recognition Accuracy</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
