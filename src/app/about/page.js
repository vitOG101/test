import Image from 'next/image';
import "@/app/about/page.css";

export default function About() {
  return (
    <div className="container about-page">
      <h1 className="title">Send your rug NFT’s</h1>
      <h2>to burner wallet</h2>
      <Image src="/image-content.png" width="1250" height={386} alt='about' />
      <h2>And get a ticket to win the pool</h2>
      <small>1 NFT = 1 TICKET</small>
      <h2 className="title">What’s the point?</h2>
      <p>Probably, you have no idea what to do with some NFTs that have lost value, been rugged, or are simply no longer needed. Me neither, but I have an idea. </p>
      <p>How about participating in a fun challenge with no risk to get a second chance for investment or to get your money back?</p>
      <p>All you need to do is send your NFTs to our specified burner wallet and receive a ticket as a chance to win something from the prize pool. The pool will consist of 1000 ADA, 10 FREE NFTs from MAXXIS, and some prizes from our partners.</p>
      <p>We will have 20 WINNERS for the first raffle, and details about future raffles and prizes will be announced on our Discord</p>
      <h2 className="title">Rules</h2>
      <p>Probably, you have no idea what to do with some NFTs that have lost value, been rugged, or are simply no longer needed. Me neither, but I have an idea. </p>
      <p>How about participating in a fun challenge with no risk to get a second chance for investment or to get your money back?</p>
      <p>All you need to do is send your NFTs to our specified burner wallet and receive a ticket as a chance to win something from the prize pool. The pool will consist of 1000 ADA, 10 FREE NFTs from MAXXIS, and some prizes from our partners.</p>
      <p>We will have 20 WINNERS for the first raffle, and details about future raffles and prizes will be announced on our Discord</p>
    </div>
  )
}
