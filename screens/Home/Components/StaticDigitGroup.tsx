import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {View, Text, Animated, StyleSheet} from "react-native";

const INITIAL_TOP = 15;
const OFFSET = 50;

let reelsBlocked = false;
const StaticDigitGroup = (props: any) => {

    let Config = {
        "reelCount": 4,
        "preloadedNumbers": [20, 20, 20, 20],
        "result": [parseInt(props.number[0]), parseInt(props.number[1]), parseInt(props.number[2]), parseInt(props.number[3])],
        "spinTime": 1000,
        "spinDifferenceTime": 800
    };
    function generateNumber() {
        return Math.floor(Math.random() * 10);
    }

    function calculateTop(index: number) {
        return INITIAL_TOP -(index * OFFSET);
    }

    function generateSpinAnimationForReel(reel: { renderedNumbers: any[]; }) {
        let animationArray: Animated.CompositeAnimation[] = [];
        reel.renderedNumbers.forEach((renderedNumber) => {
            animationArray.push(Animated.decay(renderedNumber.top, {
                velocity: 1, // + (reelIndex * 0.1)
                deceleration: 0.999005,
                useNativeDriver: true
            }))
        });
        return animationArray;
    }

    function resetPositions() {
        reelData.forEach((reel) => {
            resetPositionForReel(reel);
        })
    }

    function resetPositionForReel(reel: { desiredResult?: number; renderedNumbers: any; }) {
        reel.renderedNumbers.forEach((renderedNumber: { top: { setValue: (arg0: number) => void; }; }, index: number) => {
            renderedNumber.top.setValue(calculateTop(index))
        });
    }

    function runInfiniteSpin() {
        return new Promise((resolve, reject) => {
            let animationArray: any[] = [];
            reelData.forEach((reel, reelIndex) => {
                reel.renderedNumbers.forEach((renderedNumber) => {
                    let _animation = Animated.decay(renderedNumber.top, {
                        velocity: 1, // + (reelIndex * 0.1)
                        deceleration: 0.99999,
                        useNativeDriver: true
                    });
                    animationArray.push({animation: _animation, reelIndex});
                });
            });

            let animation = Animated.parallel(animationArray.map(anim => anim.animation));
            animation.start();
            let interval = setInterval(() => {
                animation.stop();
                animation.reset();
                animationArray.forEach((anim) => {
                    const reel = reelData[anim.reelIndex];
                    resetPositionForReel(reel);
                });
                animation.start();
            }, 300);

            setTimeout(() => {
                reelData.forEach((reel, reelIndex) => {
                    setTimeout(() => {
                        animationArray = animationArray.filter(x => x.reelIndex !== reelIndex);
                        if (animationArray.length === 0) {
                            animation.stop();
                            clearInterval(interval);
                        }
                        else {
                            animation.stop();
                            animation.reset();
                            animation = Animated.parallel(animationArray.map(anim => anim.animation));
                            animation.start();
                        }
                        resetPositionForReel(reel);
                        runSlowdownAnimation(reel).then(() => {
                            console.log(`Reel ${reelIndex} finished`);
                            if (reelIndex === reelData.length - 1) {
                                resolve();
                            }
                        });
                    }, reelIndex * Config.spinDifferenceTime);
                });
            }, Config.spinTime);
        });
    }

    function runSlowdownAnimation(reel: { desiredResult?: number; renderedNumbers: any[] | { top: Animated.Value; value: number; }[]; }) {
        return new Promise((resolve) => {
            let animation = generateSpinAnimationForReel(reel);
            Animated.parallel(animation).start(() => {
                resolve();
            });
        });
    }

    /*
      A SMALL WARNING; MAKE SURE THAT WHEN YOU INTEGRATE YOU DON'T RUN SetupReels & runInfiniteSpin TWICE BECAUSE IT WILL CRASH THE FLOW
      CREATE A BLOCKER AND/OR CANCEL THE EXISTING runTiming & animations
     */


    const generateReels = () => {
        let reelArray = [];
        for (let reelIndex = 0; reelIndex < Config.reelCount; reelIndex++) {
            reelArray.push({
                desiredResult: Config.result[reelIndex],
                renderedNumbers: generateInitialRender(reelIndex)
            })
        }
        return reelArray;
    };

    const setupReels = () => {
        reelData.forEach((reel, index) => {
            let previousTop = reel.renderedNumbers[Config.preloadedNumbers[index]];

            reel.renderedNumbers.forEach((number, index) => {
                number.top.setValue(calculateTop(index));
                number.value = generateNumber()
            });

            reel.renderedNumbers[0].value = previousTop.value;
            reel.renderedNumbers[Config.preloadedNumbers[index]].value = Config.result[index];
        });
        setReelData([...reelData]);
    };

    const generateInitialRender = (reelIndex: number) => {
        let resultArray = [];
        for (let numberIndex = 0; numberIndex <= Config.preloadedNumbers[reelIndex]; numberIndex++) {
            resultArray.push({top: new Animated.Value(calculateTop(numberIndex)), value: generateNumber()})
        }
        return resultArray;
    };

    const onPressSpin = () => {
        if (reelsBlocked) return;
        reelsBlocked = true;
        setupReels();
        runInfiniteSpin().then(() => {
           reelsBlocked = false;
           props.setIsSpinning(false);
        });
    };
    const [reelData, setReelData] = useState(generateReels());
    if(props.isSpinning) {
        onPressSpin();
    }
   // setTimeout(onPressSpin, 4000);



    return (
        <View style={styles.container}>
            {
                reelData.map((reel, index) => {
                    return <View key={`reel-${index}`} style={styles.reelContainer}>
                        {
                            reel.renderedNumbers.map((number, index) => {
                                return <Animated.Text key={`reel-entry-${index}`} style={[styles.reelContent, {transform: [{translateY: number.top}]}]}>{number.value}</Animated.Text>
                            })
                        }

                    </View>
                })}
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: 'red',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'yellow',
        height: 60,
        width: 250,
        bottom: 70,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    reelContainer: {
        flex: 4,
        height: 60,
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: 'yellow',
        alignItems: 'center',
    },
    reelContent: {
        position: 'absolute',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'yellow',
    }
});


export default StaticDigitGroup;
