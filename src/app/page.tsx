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
        </div>
      </section>


      {/* Cards floating above mobile */}
      <div className={styles.cardsSection}>
        <div className={`${styles.card} ${styles.card1}`}>
          <h1>Analytics for Photo Views & Downloads</h1>
          <p>Track how many times photos are viewed, highlighted, or downloaded with smart insights.</p>
          <Image
            src="/card1.svg"
            alt="Analytics"
            width={300}
            height={200}
          />
        </div>

        <div className={`${styles.card} ${styles.card2} `}>
          <h1>Invite Participants Easily</h1>

          <div>
            <Image
              src="/card2.svg"
              alt="Analytics"
              width={70}
              height={100}
            />
            <p>Send quick invites so clients, friends, or teams can join, view, and contribute to albums without hassle.</p>
          </div>

        </div>

        <div className={`${styles.card} ${styles.card3}`}>
          <div>
            <h1>Create Personal or Public Groups</h1>
            <p>Build private groups for clients or open groups for events, making photo sharing flexible and easy.</p>
          </div>
          <Image
            src="/card3.svg"
            alt="Analytics"
            width={100}
            height={200}
          />
        </div>

        <div className={`${styles.card} ${styles.card4}`}>
          <div>
            <h1>Share Albums Smarter, Not Harder</h1>
          </div>
        </div>
      </div>

      {/* Mobile Mockup */}
      <div className={styles.mobileWrapper}>
        <Image
          src="/mobile.svg"
          alt="Mobile Mockup"
          width={500}
          height={500}
          className={styles.mobileImg}
        />


      </div>


      {/* Cards Section */}
      <section className={cardStyles.cardsContainer}>
        {/* Top Row Cards */}
        <div className={cardStyles.cardRow}>
          {/* Card 1 */}
          <div className={`${cardStyles.card} ${cardStyles.topCard}`}>
            <div className={cardStyles.cardHeader}>
              <h3>Facial Recognition</h3>
              <div className={cardStyles.arrowIcon}>
                <Image src="/arrow-up-right.svg" alt="Arrow icon" width={20} height={20} />
              </div>
            </div>
            <p>
              Automatically Find Your Photos With Smart Facial Recognition—No
              Endless Scrolling.
            </p>
            <div className={cardStyles.cardIcon}>
              <Image src="/facial-recognition.svg" alt="Facial Recognition Icon" width={90} height={90} />
            </div>
          </div>

          {/* Card 2 */}
          <div className={`${cardStyles.card} ${cardStyles.topCard}`}>
            <div className={cardStyles.cardHeader}>
              <h3>Quality Retention</h3>
              <div className={cardStyles.arrowIcon}>
                <Image src="/arrow-up-right.svg" alt="Arrow icon" width={20} height={20} />
              </div>
            </div>
            <p>
              Keep your photos sharp and clear without losing quality after
              upload.
            </p>
            <div className={cardStyles.cardIcon}>
              <Image src="/quality-retention.svg" alt="Quality Retention Icon" width={80} height={80} />
            </div>
          </div>

          {/* Card 3 */}
          <div className={`${cardStyles.card} ${cardStyles.topCard}`}>
            <div className={cardStyles.cardHeader}>
              <h3>Unlimited Event Groups</h3>
              <div className={cardStyles.arrowIcon}>
                <Image src="/arrow-up-right.svg" alt="Arrow icon" width={20} height={20} />
              </div>
            </div>
            <p>
              Organize memories with unlimited event groups for every occasion.
            </p>
            <div className={cardStyles.cardIcon}>
              <Image src="/unlimited-event-group.svg" alt="Event Groups Icon" width={80} height={80} />
            </div>
          </div>
        </div>

        {/* Second Row Cards */}
        <div className={cardStyles.cardRow}>
          {/* Card 4 */}
          <div className={cardStyles.statscard}>
            <div className={cardStyles.statscontent}>
              <Image src="/15K.svg" alt="15K" width={70} height={70} />
              <div>
                <h3>15K </h3>
                <p>Active User On App</p>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className={cardStyles.statscard}>
            <div className={cardStyles.statscontent}>
              <Image src="/1M.svg" alt="1M" width={70} height={70} />
              <div>
                <h3>1M </h3>
                <p>photos Upload & Share</p>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className={cardStyles.statscard}>
            <div className={cardStyles.statscontent}>
              <Image src="/ninenine.svg" alt="99%" width={70} height={70} />
              <div>
                <h3>99% </h3>
                <p>face Recognition Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
