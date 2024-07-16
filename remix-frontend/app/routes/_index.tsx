import { Link } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/node"

import Page from "components/page"


export const meta: MetaFunction = () => {
	return [
		{ title: "The Team" },
	]
}

export default function Index() {
	return (
		<Page>
			<h1 className="text-5xl text-center font-addington font-semibold py-10 lg:py-7 lg:mx-64 lg:text-6xl">Explore The Art Around The World</h1>

			<Link to="/team" className="bg-black text-[#fffcf3] py-2 px-5 font-semibold w-fit self-center">
				<div className="flex items-center gap-2">
					<p>Meet The Team</p>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={16} height={16} className="fill-[#fffcf3]">
						<path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
					</svg>
				</div>
			</Link>
		</Page>
	)
}
