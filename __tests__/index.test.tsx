import { screen, act } from "@testing-library/react";
import ReactDOM from "react-dom/client";
import Banner from "components/Banner";

let container: HTMLElement;
beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	document.body.removeChild(container);
});

describe("Home", () => {
	it("should render correctly", () => {
		act(() => {
			ReactDOM.createRoot(container).render(<Banner />);
		});
		let testCom = screen.getByText(/Nền tảng hỗ trợ dịch vụ & tìm Freelancer/i);
		expect(testCom).toBeInTheDocument();
	});
});
