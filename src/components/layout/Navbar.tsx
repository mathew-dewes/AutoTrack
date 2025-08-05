import Link from "next/link";

export default function Navbar(){
    return(
        <div className="flex justify-between h-20 items-center mr-50">
            <h1>AutoTrack</h1>
            <ul className="flex gap-10">
                <Link href={'/dashboard'}>Dashboard</Link>
                <Link href={'/vehicles'}>Vehicles</Link>
                <Link href={'/log'}>Log</Link>
                <Link href={'/reminders'}>Reminders</Link>
                <Link href={'/reports'}>Reports</Link>
                <p>Profile Icon</p>
            </ul>
        </div>
    )
}