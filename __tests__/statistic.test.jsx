import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MochETHData } from "../mockData/index";
import Statistic from "../pages/statistic";
import { API } from "../shared/api/apiUtils";
const ticker = "ETH";
const server = setupServer(
    ...[
        rest.get(`${API}/query*`, (_, res, ctx) => {
            return res(ctx.json(MochETHData));
        })
    ]
);

beforeAll(() => server.listen());
afterEach(() => {
    render(<Statistic ticker={ticker} />);
    server.resetHandlers();
});
afterAll(() => server.close());

describe("check statics", () => {
    it("check for render chart main content", async () => {
        waitFor(() => {
            screen.getByTestId("train-network-button").toBeInTheDocument();
            expect(screen.getByTestId("market")).toHaveTextContent(
                `Market Information for ${ticker}`
            );
        });
    });

    it("test static table value", async () => {
        const matchValues = {
            "moda-test-value-id": "1779.28",
            "average-test-value-id": "1664.49",
            "max-test-value-id": "4807.98",
            "min-test-value-id": "107.82",
            "number-of-values-test-value-id": "1000",
            "start-traiding-test-value-id": "3 years ago"
        };
        waitFor(() => {
            Object.entries(matchValues).forEach(([attribute, value]) => {
                expect(screen.getByTestId(attribute)).toHaveTextContent(value);
            });
        });
    });

    it("test default neural network values", async () => {
        const matchValues = {
            "RNN-blocks": "4",
            "window-size": "35",
            "input-epoch": "5",
            "learning-rate": "0.01"
        };
        waitFor(() => {
            Object.entries(matchValues).forEach(([attribute, value]) => {
                expect(screen.getByTestId(attribute)).toHaveAttribute(
                    "value",
                    value
                );
            });
        });
    });

    it("work of the neural network", async () => {
        waitFor(() => {
            screen.getByTestId("train-network-button").toBeInTheDocument();
            fireEvent.click(screen.getByTestId("train-network-button"));
        });
        waitFor(() => {
            screen.getByTestId("reult-table").toBeInTheDocument();
        });
    });
});
