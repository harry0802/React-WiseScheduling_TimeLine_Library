import React from 'react'
import styled, { keyframes } from 'styled-components'

//! =============== 1. Keyframe Animations ===============

const headAnimation = keyframes`
  0%, 10%, 20%, 26%, 28%, 90%, 100% {
    height: 8.25vmax;
    bottom: 0;
    transform-origin: bottom right;
    transform: rotateZ(0);
  }
  5%, 15%, 22%, 24%, 30% {
    height: 8.1vmax;
  }
  32%, 50% {
    height: 8.25vmax;
  }
  55%, 60% {
    bottom: 0.75vmax;
    transform-origin: bottom right;
    transform: rotateZ(0);
  }
  70%, 80% {
    bottom: 0.75vmax;
    transform-origin: bottom right;
    transform: rotateZ(10deg);
  }
`

const bodyAnimation = keyframes`
  0%, 10%, 20%, 26%, 28%, 32%, 100% {
    height: 7.2vmax;
  }
  5%, 15%, 22%, 24%, 30% {
    height: 7.05vmax;
  }
`

const earLAnimation = keyframes`
  0%, 10%, 20%, 26%, 28%, 82%, 100% {
    transform: rotateZ(-50deg);
  }
  5%, 15%, 22%, 24% {
    transform: rotateZ(-48deg);
  }
  30%, 31% {
    transform: rotateZ(-30deg);
  }
  32%, 80% {
    transform: rotateZ(-60deg);
  }
`

const earRAnimation = keyframes`
  0%, 10%, 20%, 26%, 28% {
    transform: rotateZ(20deg);
  }
  5%, 15%, 22%, 24% {
    transform: rotateZ(18deg);
  }
  30%, 31% {
    transform: rotateZ(10deg);
  }
  32% {
    transform: rotateZ(25deg);
  }
`

const snoutAnimation = keyframes`
  0%, 10%, 20%, 26%, 28%, 82%, 100% {
    height: 3.75vmax;
  }
  5%, 15%, 22%, 24% {
    height: 3.45vmax;
  }
`

const snoutBAnimation = keyframes`
  0%, 10%, 20%, 26%, 28%, 98%, 100% {
    width: 1.875vmax;
  }
  5%, 15%, 22%, 24% {
    width: 1.8vmax;
  }
  34%, 98% {
    width: 1.275vmax;
  }
`

const shadowAnimation = keyframes`
  0%, 10%, 20%, 26%, 28%, 30%, 84%, 100% {
    width: 99%;
  }
  5%, 15%, 22%, 24% {
    width: 101%;
  }
  34%, 81% {
    width: 96%;
  }
`

const eyeAnimation = keyframes`
  0%, 30% {
    width: 0.675vmax;
    height: 0.3vmax;
  }
  32%, 59%, 90%, 100% {
    width: 0.525vmax;
    height: 0.525vmax;
    transform: translateY(0);
  }
  60%, 75% {
    transform: translateY(-0.3vmax);
  }
  80%, 85% {
    transform: translateY(0.15vmax);
  }
`

//! =============== 2. Styled Components ===============

const MascotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  padding: 0;
  margin: 0;
`

const DogContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  isolation: isolate;
`

const Dog = styled.div`
  position: relative;
  width: 22.5vmax;
  height: 8.25vmax;

  &::before {
    content: '';
    position: absolute;
    bottom: -0.75vmax;
    right: -0.15vmax;
    width: 100%;
    height: 1.5vmax;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    z-index: -1000;
    animation: ${shadowAnimation} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01)
      infinite;
  }
`

const DogPaws = styled.div`
  position: absolute;
  bottom: 0;
  left: 7.5vmax;
  width: 12vmax;
  height: 3vmax;
`

const Leg = styled.div`
  position: absolute;
  bottom: 0;
  width: 2vmax;
  height: 2.125vmax;
`

const Paw = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1.95vmax;
  height: 1.875vmax;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 3.75vmax;
    height: 3.75vmax;
    border-radius: 50%;
  }
`

const Top = styled.div`
  position: absolute;
  bottom: 0;
  left: 0.75vmax;
  height: 4.5vmax;
  width: 2.625vmax;
  border-top-left-radius: 1.425vmax;
  border-top-right-radius: 1.425vmax;
  transform-origin: bottom right;
  transform: rotateZ(90deg) translateX(-0.1vmax) translateY(1.5vmax);
  z-index: -1;
`

const BackLeftLeg = styled(Leg)`
  left: -3vmax;
  z-index: -10;
`

const BackLeftPaw = styled(Paw)`
  &::before {
    background-color: ${({ theme }) => theme.colors.borderTokens.light};
  }
`

const BackLeftTop = styled(Top)`
  background-image: linear-gradient(
    80deg,
    transparent 20%,
    ${({ theme }) => theme.colors.accent?.primaryHover || '#0d7acc'} 20%
  );
`

const FrontLeftLeg = styled(Leg)`
  z-index: 10;
  left: 0;
`

const FrontLeftPaw = styled(Paw)`
  &::before {
    background-color: ${({ theme }) =>
      theme.colors.backgroundTokens.surfaceAlt};
  }
`

const FrontLeftTop = styled(Top)`
  background-image: linear-gradient(
    70deg,
    transparent 20%,
    ${({ theme }) => theme.colors.accent?.primary || '#1593EB'} 20%
  );
`

const FrontRightLeg = styled(Leg)`
  right: 0;
`

const FrontRightPaw = styled(Paw)`
  &::before {
    background-color: ${({ theme }) =>
      theme.colors.backgroundTokens.surfaceAlt};
  }
`

const FrontRightTop = styled(Top)`
  background-image: linear-gradient(
    70deg,
    transparent 20%,
    ${({ theme }) => theme.colors.accent?.primary || '#1593EB'} 20%
  );
`

const DogBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  bottom: 0.3vmax;
  left: 4.75vmax;
  width: 17.75vmax;
  height: 5.5vmax;
  border-top-left-radius: 2.5vmax;
  border-top-right-radius: 5vmax;
  border-bottom-right-radius: 1.5vmax;
  border-bottom-left-radius: 5vmax;
  background-color: ${({ theme }) => theme.colors.accent?.primary || '#1593EB'};
  z-index: -2;
  animation: ${bodyAnimation} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
`

const DogTail = styled.div`
  position: absolute;
  right: -3vmax;
  bottom: 0.5vmax;
  height: 1.2vmax;
  width: 4vmax;
  background-color: ${({ theme }) =>
    theme.colors.accent?.primaryHover || '#0d7acc'};
  border-radius: 1.2vmax;
`

const DogHead = styled.div`
  position: absolute;
  left: 1.5vmax;
  bottom: 0.5vmax;
  width: 8.75vmax;
  height: 8.25vmax;
  border-top-left-radius: 4.05vmax;
  border-top-right-radius: 4.05vmax;
  border-bottom-right-radius: 3.3vmax;
  border-bottom-left-radius: 3.3vmax;
  background-color: ${({ theme }) =>
    theme.colors.accent?.primaryLight || '#6fb9f0'};
  animation: ${headAnimation} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
`

const DogHeadContainer = styled.div`
  position: absolute;
  left: 1.5vmax;
  bottom: 0;
  width: 9.75vmax;
  height: 8.25vmax;
  animation: ${headAnimation} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
  z-index: -1;
`

const DogSnout = styled.div`
  position: absolute;
  left: -1.5vmax;
  bottom: 0;
  width: 7.5vmax;
  height: 3.75vmax;
  border-top-right-radius: 3vmax;
  border-bottom-right-radius: 3vmax;
  border-bottom-left-radius: 4.5vmax;
  background-color: ${({ theme }) => theme.colors.backgroundTokens.surfaceAlt};
  animation: ${snoutAnimation} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;

  &::before {
    content: '';
    position: absolute;
    left: -0.1125vmax;
    top: -0.15vmax;
    width: 1.875vmax;
    height: 1.125vmax;
    border-top-right-radius: 3vmax;
    border-bottom-right-radius: 3vmax;
    border-bottom-left-radius: 4.5vmax;
    background-color: ${({ theme }) => theme.colors.backgroundTokens.secondary};
    animation: ${snoutBAnimation} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01)
      infinite;
  }
`

const DogNose = styled.div`
  position: absolute;
  top: -1.95vmax;
  left: 40%;
  width: 0.75vmax;
  height: 2.4vmax;
  border-radius: 0.525vmax;
  transform-origin: bottom;
  transform: rotateZ(10deg);
  background-color: ${({ theme }) => theme.colors.backgroundTokens.surfaceAlt};
`

const DogEyes = styled.div`
  position: relative;
`

const DogEye = styled.div`
  position: absolute;
  top: -0.9vmax;
  width: 0.675vmax;
  height: 0.375vmax;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.backgroundTokens.secondary};
  animation: ${eyeAnimation} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
`

const DogEyeLeft = styled(DogEye)`
  left: 27%;
`

const DogEyeRight = styled(DogEye)`
  left: 65%;
`

const DogEar = styled.div`
  position: absolute;
  width: 5.5vmax;
  height: 2.375vmax;
  border-top-left-radius: 0vmax;
  border-top-right-radius: 0vmax;
  border-bottom-right-radius: 3.3vmax;
  border-bottom-left-radius: 3.3vmax;
  background-color: ${({ theme }) =>
    theme.colors.accent?.primaryHover || '#0d7acc'};
`

const DogEarLeft = styled(DogEar)`
  top: 1.8vmax;
  left: 6.5vmax;
  transform-origin: bottom left;
  transform: rotateZ(-45deg);
  z-index: -1;
  animation: ${earLAnimation} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
`

const DogEarRight = styled(DogEar)`
  top: 0.8vmax;
  right: 5.5vmax;
  transform-origin: bottom right;
  transform: rotateZ(15deg);
  z-index: -2;
  animation: ${earRAnimation} 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
`

//! =============== 3. Component ===============

function DogMascot() {
  return (
    <MascotContainer>
      <DogContainer>
        <Dog>
          <DogPaws>
            <BackLeftLeg>
              <BackLeftPaw />
              <BackLeftTop />
            </BackLeftLeg>
            <FrontLeftLeg>
              <FrontLeftPaw />
              <FrontLeftTop />
            </FrontLeftLeg>
            <FrontRightLeg>
              <FrontRightPaw />
              <FrontRightTop />
            </FrontRightLeg>
          </DogPaws>

          <DogBody>
            <DogTail />
          </DogBody>

          <DogHead>
            <DogSnout>
              <DogNose />
              <DogEyes>
                <DogEyeLeft />
                <DogEyeRight />
              </DogEyes>
            </DogSnout>
          </DogHead>

          <DogHeadContainer>
            <DogEarLeft />
            <DogEarRight />
          </DogHeadContainer>
        </Dog>
      </DogContainer>
    </MascotContainer>
  )
}

export default DogMascot

