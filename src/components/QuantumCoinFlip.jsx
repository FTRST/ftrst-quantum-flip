import React, {
    useState,
    useMemo,
  } from "react";
  import styled, { css } from "styled-components";
  import {
    BaseWindow,
    TabContainer,
    Button,
    WindowInset,
    WindowInner,
    WindowSpacing,
    WindowTitle,
  } from "futurist-components";
  
  import RandomText from "./files/RandomText";
  
  // Define tab content components
  const CreatorTab = ({ quantumCollect, selectedValue, flipAgain }) => {
    console.log("Selected value is:", selectedValue);
    return (
      <>
        {selectedValue ? (
          <>
            <Button action={flipAgain} label="Flip Again" />
            <WindowInset>
              <WindowSpacing>
                <WindowInner>
                  <>
                    <div>
                      {selectedValue !== "" && (
                        <RandomText choice={selectedValue} />
                      )}
                    </div>
                  </>
                </WindowInner>
              </WindowSpacing>
            </WindowInset>
          </>
        ) : (
          <>
            <WindowInset>
              <WindowSpacing>
                <WindowInner>
                  <WindowTitle value="Flip to Decide"></WindowTitle>
                  {!selectedValue && (
                    <>
                      <div>
                        <p>
                          Ever have a mental fork in the road? Not sure of which
                          path to take?
                        </p>
                        <p>
                          Try Quantum Coin Flip, a truly randomized decision
                          maker.
                        </p>
                        <p>
                          Simply think, "heads I'll do this, tails I'll do that",
                          and flip!
                        </p>
                      </div>
                    </>
                  )}
                </WindowInner>
              </WindowSpacing>
            </WindowInset>
            <Button
              label="Flip A Coin"
              action={quantumCollect}
              style={css`
                width: 100%;
              `}
            />
          </>
        )}
      </>
    );
  };
  
  const DetailsTab = () => (
    <>
      <WindowInset>
        <WindowSpacing>
          <WindowInner>
            <WindowTitle value="Why Use Quantum?"></WindowTitle>
            <div style={{ maxHeight: "20em", overflowY: "scroll" }}>
              <p>
                Did you know the weight distribution of a US quarter favors the
                saying "tails never fails"?
              </p>
              <a href="https://www.ripleys.com/stories/coin-toss-or-not">
                <p>
                  Or how physicists have trained themselves to consistently flip
                  the same result 10 times in a row?
                </p>
              </a>
              <p>
                In the case of asking the universe for a recommendation,
                randomness is key, and neither of those seem very random.
              </p>
              <p>
                QCF is an app which creates a binary output (heads or tails) based
                on the sum of numbers.
              </p>
              <p>
                The numbers are generated through a theoretical concept of quantum
                physics, rather than a typical Quantum Random Number Generator.
              </p>
            </div>
          </WindowInner>
        </WindowSpacing>
      </WindowInset>
    </>
  );
  
  function QuantumCoinFlip({ device, manipulateWindows }) {
    const windowDetails = device.windows.find((w) => w.id === "qcf");
    const [selectedValue, setSelectedValue] = useState("");
  
    async function flipAgain() {
      console.log("Running flip again");
      setSelectedValue("");
      await quantumCollect();
    }
  
    async function quantumCollect() {
      try {
        let url = "https://futurist.io/quantum";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error!`);
        }
  
        const data = await response.json();
        console.log("Response data:", data);
  
        const series = data.data;
  
        if (!Array.isArray(series)) {
          throw new Error("Response did not include an array.");
        }
  
        const sum = series.reduce((acc, num) => acc + num, 0);
  
        const sumOf = sum % 2 === 0 ? "heads" : "tails";
  
        console.log("The sum of things is:", sumOf);
  
        if (sumOf == "heads") {
          setSelectedValue("heads");
        } else if (sumOf == "tails") {
          setSelectedValue("tails");
        } else {
          setSelectedValue("");
        }
  
        return;
      } catch (error) {
        console.error("Fetch error:", error);
        return "Error";
      }
    }
  
    const tabComponents = useMemo(
      () => ({
        Creator: () => (
          <CreatorTab
            quantumCollect={quantumCollect}
            selectedValue={selectedValue}
            flipAgain={flipAgain}
          />
        ),
        Details: () => <DetailsTab />,
      }),
      [selectedValue, quantumCollect, flipAgain],
    );
  
    return (
      <>
        {windowDetails && (
          <>
            <BaseWindow
              key="1"
              id="qcf"
              device={device}
              manipulateWindows={manipulateWindows}
            >
              <TabContainer tabComponents={tabComponents} />
            </BaseWindow>
          </>
        )}
      </>
    );
  }
  
  export default QuantumCoinFlip;
  