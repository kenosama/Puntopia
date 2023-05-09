import Feed from "@components/Feed.jsx";

const Home = () => {
  return (
    <section className="flex-col w-full flex-center">
      <h1 className="text-center head_text">
        Discover and Share &nbsp;
        <br className="max-md:hidden" />
        <span className="text-center orange_gradient">
          Community written Puns
        </span>
      </h1>
      <p className="text-center desc">
        Puntopia is a Open-source Community sharing tool to discover, create and
        share funny puns!
      </p>
      <Feed />
    </section>
  );
}

export default Home;