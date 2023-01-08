import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
    it("renders a heading", () => {
        render(<Home />);

        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
    });
    it("Next steps click", () => {
        render(<Home />);

        const steptsDescriptionData = [
            "Study the financial condition and trading history of the selected stock",
            "View general trading statistics"
        ];

        steptsDescriptionData.forEach((descriptionData) => {
            const element = screen.getByTestId("description");
            expect(element).toHaveTextContent(descriptionData);
            const nextButton = screen.getByTestId("next-button");
            fireEvent.click(nextButton);
        });
    });
});
