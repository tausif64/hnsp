import{ type Key } from 'react'
import HomeCard from './HomeCard'

const DummyHomeCard = () => {
    const data = [
        {
            no: '45',
            title: "Number of  School",
            indicator: "#3454D1",
        },
        {
            no: '584',
            title: "Enrolled Children",
            indicator: "#ffa21d",
        },
        {
            no: '46.9%',
            title: "avg. attendance/ day",
            indicator: "#17C666",
        },
        {
            no: '398',
            title: "Midday meal",
            indicator: "#EF7A7A",
        },
        {
            no: '45',
            title: "Number of  School",
            indicator: "#3454D1",
        },
        {
            no: '584',
            title: "Enrolled Children",
            indicator: "#ffa21d",
        },
        {
            no: '46.9%',
            title: "avg. attendance/ day",
            indicator: "#17C666",
        },
        {
            no: '398',
            title: "Midday meal",
            indicator: "#EF7A7A",
        },
    ]
    return (
        <>
            <div className="grid grid-cols-12 gap-3 md:gap-6 lg:gap-8 flex-wrap my-6 md:my-10">
                {data.map((item: unknown, index: Key | null | undefined) =>
                    <HomeCard key={index} item={item} />
                )}
            </div>
        </>
      )
}

export default DummyHomeCard