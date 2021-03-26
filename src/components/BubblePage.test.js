import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";
import MockBubbles from './Bubbles';
import MockColorList from './ColorList';

const testColors = [
  {
    code: {hex: "#f0f8ff"},
    color: "aliceblue",
    id: 1
  },
  {
    code: {hex: "#99ddbc"},
    color: "limegreen",
    id: 2
  },
  {
    code: {hex: "#dcdd99"},
    color: "softyellow",
    id: 8
  },
]

test("Renders BubblePage without errors", () => {
  render (<BubblePage />)
});

test("Fetches data and renders the bubbles on mounting", async () => {
  // render (<BubblePage />)
  render (<MockBubbles colors={testColors}/>);
  render (<MockColorList colors={testColors}/>)

  const bubbles = await screen.findAllByTestId('circle');
  const alice = await screen.findByText('aliceblue');
  const lime = await screen.findByText('limegreen');
  const yellow = await screen.findByText('softyellow');

  bubbles.forEach(bubble => {
    expect(bubble).toBeInTheDocument()
  })
  expect(bubbles).toHaveLength(testColors.length)

  expect(alice).toHaveTextContent('aliceblue');
  expect(lime).toHaveTextContent('limegreen');
  expect(yellow).toHaveTextContent('softyellow');

  expect(alice).toBeInTheDocument();
  expect(lime).toBeInTheDocument();
  expect(yellow).toBeInTheDocument();
  // console.log(alice)
});

//Task List
//1. Setup test for basic rendering of component
//2. Setup test for initial rendering of bubbles on loading