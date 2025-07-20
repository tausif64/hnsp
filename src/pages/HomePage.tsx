import { ChartAreaInteractive } from "@/components/my-component/ChartAreaInteractive";
import { ChartBarMultiple } from "@/components/my-component/ChartBarMultiple";
import DummyHomeCard from "@/components/my-component/DummyHomeCard";


const HomePage = () => {

  return (
    <>
      <DummyHomeCard />
      <br />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-8">
          <ChartBarMultiple />
        </div>
        <div className="col-span-4">
          <ChartAreaInteractive />
        </div>
      </div>
    </>
  )
};

export default HomePage;
