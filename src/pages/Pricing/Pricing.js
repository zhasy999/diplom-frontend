import React from 'react';
import { Button } from '../../globalStyles';
import { AiFillThunderbolt } from 'react-icons/ai';
import { GiCrystalBars } from 'react-icons/gi';
import { GiCutDiamond, GiRock } from 'react-icons/gi';
import { GiFloatingCrystal } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';
import {
  PricingSection,
  PricingWrapper,
  PricingHeading,
  PricingContainer,
  PricingCard,
  PricingCardInfo,
  PricingCardIcon,
  PricingCardPlan,
  PricingCardCost,
  PricingCardLength,
  PricingCardFeatures,
  PricingCardFeature
} from './Pricing.elements';

function Pricing() {
  return (
    <IconContext.Provider value={{ color: '#a9b3c1', size: 64 }}>
      <PricingSection>
        <PricingWrapper>
          <PricingHeading>Our Services</PricingHeading>
          <PricingContainer>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon>
                  <GiRock />
                </PricingCardIcon>
                <PricingCardPlan>New opportunities</PricingCardPlan>
                <PricingCardLength>absolute</PricingCardLength>
                <PricingCardFeatures>
                  <PricingCardFeature>Time</PricingCardFeature>
                  <PricingCardFeature>Student problem</PricingCardFeature>
                  <PricingCardFeature>Targeted analysis</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Receive</Button>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon>
                  <GiCrystalBars />
                </PricingCardIcon>
                <PricingCardPlan>Benefits</PricingCardPlan>
                <PricingCardLength>absolute</PricingCardLength>
                <PricingCardFeatures>
                  <PricingCardFeature>Fair performance measurement</PricingCardFeature>
                  <PricingCardFeature>Increased precision</PricingCardFeature>
                  <PricingCardFeature>Student experience</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Receive</Button>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon>
                  <GiCutDiamond />
                </PricingCardIcon>
                <PricingCardPlan>W-D Algorithm </PricingCardPlan>
                <PricingCardLength>absolute</PricingCardLength>
                <PricingCardFeatures>
                  <PricingCardFeature>Easy process</PricingCardFeature>
                  <PricingCardFeature>User reading</PricingCardFeature>
                  <PricingCardFeature>Deliberate assessment</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Receive</Button>
              </PricingCardInfo>
            </PricingCard>
          </PricingContainer>
        </PricingWrapper>
      </PricingSection>
    </IconContext.Provider>
  );
}
export default Pricing;