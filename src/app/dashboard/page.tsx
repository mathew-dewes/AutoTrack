
import UpcomingServices from "@/components/tables/UpcomingServiceLogs";
import Link from "next/link";

export default function Page() {
    return (
        <div>
            <div className="flex justify-between mr-100 mt-20">
                <div>
                    <h1 className="font-bold text-xl mb-5">Upcoming Service Reminders:</h1>
                    <UpcomingServices limit={5} />
       <Link  href={'/log/services'}><button className="cursor-pointer bg-accent-500 text-white p-3 rounded-xl mt-5 text-sm">View All</button></Link>
                </div>
                <div>
                    <h1 className="font-bold text-xl">Quick actions:</h1>
                    <div className="text-center mt-10 flex flex-col gap-8">
                        <p>Add vehicle</p>
                        <p>Log service</p>
                        <p>Log distance</p>
                    </div>

                </div>


            </div>
            <div className="flex gap-30">
                <div>
                    <h1 className="font-bold text-xl mt-20">Live stats:</h1>
                    <div className="flex gap-5 mt-5">
                        <div className="hover:bg-gray-50 transition border-2 border-gray-200 bg-white p-6 rounded-lg w-fit ">
                            <h1>Total distance traveled</h1>
                            <p>Total reminders: 3</p>
                            <p>Current ODO reading: 123k</p>
                            <p>Next service due in: 1200km</p>
                        </div>
                        <div className="hover:bg-gray-50 transition border-2 border-gray-200 bg-white p-6 rounded-lg w-fit ">
                            <h1>Nissan Skyline</h1>
                            <p>Total reminders: 3</p>
                            <p>Current ODO reading: 123k</p>
                            <p>Next service due in: 1200km</p>
                        </div>
                        <div className="hover:bg-gray-50 transition border-2 border-gray-200 bg-white p-6 rounded-lg w-fit ">
                            <h1>Nissan Skyline</h1>
                            <p>Total reminders: 3</p>
                            <p>Current ODO reading: 123k</p>
                            <p>Next service due in: 1200km</p>
                        </div>

                    </div>
                </div>
                <div>
                    <h1 className="font-bold text-xl mt-20">My Vehicles:</h1>
                    <div className="flex gap-5 mt-5">
                        <div className="hover:bg-gray-50 transition border-2 border-gray-200 bg-white p-6 rounded-lg w-fit ">
                            <h1>Nissan Skyline</h1>
                            <p>Total reminders: 3</p>
                            <p>Current ODO reading: 123k</p>
                            <p>Next service due in: 1200km</p>
                        </div>
                        <div className="hover:bg-gray-50 transition border-2 border-gray-200 bg-white p-6 rounded-lg w-fit ">
                            <h1>Nissan Skyline</h1>
                            <p>Total reminders: 3</p>
                            <p>Current ODO reading: 123k</p>
                            <p>Next service due in: 1200km</p>
                        </div>
                        <div className="hover:bg-gray-50 transition border-2 border-gray-200 bg-white p-6 rounded-lg w-fit ">
                            <h1>Nissan Skyline</h1>
                            <p>Total reminders: 3</p>
                            <p>Current ODO reading: 123k</p>
                            <p>Next service due in: 1200km</p>
                        </div>

                    </div>
                        <Link  href={'/vehicles'}><button className="cursor-pointer bg-accent-500 text-white p-3 rounded-xl mt-5 text-sm">View All</button></Link>
                </div>
            </div>






        </div>

    )
}