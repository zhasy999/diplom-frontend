import React from 'react';
import { InfoSection } from '../../pages';
import { homeObjOne, homeObjTwo } from './Data';

function About() {
  return (
    <>
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
    </>
  );
}

export default About;