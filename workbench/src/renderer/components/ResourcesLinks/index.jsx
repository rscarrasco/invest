import React from 'react';

import PropTypes from 'prop-types';
import { MdOpenInNew } from 'react-icons/md';

import { ipcMainChannels } from '../../../main/ipcMainChannels';

const { ipcRenderer } = window.Workbench.electron;

const UG_ROOT = 'http://releases.naturalcapitalproject.org/invest-userguide/latest';
const FORUM_ROOT = 'https://community.naturalcapitalproject.org';

// map model names to forum tags:
const FORUM_TAGS = {
  sdr: 'sdr',
  ndr: 'ndr',
  habitat_quality: 'habitat-quality',
  seasonal_water_yield: 'seasonal-water-yield',
  carbon: 'carbon',
  annual_water_yield: 'annual-water-yield',
  habitat_risk_assessment: 'hra',
  recreation: 'recreation',
  coastal_vulnerability: 'coastal-vulnerability',
  coastal_blue_carbon: 'blue-carbon',
  crop_production_percentile: 'crop-production',
  crop_production_regression: 'crop-production',
  pollination: 'pollination',
  forest_carbon_edge_effect: 'carbon-edge-effects',
  delineateit: 'delineateit',
  fisheries: 'fisheries',
  fisheries_hst: 'fisheries',
  urban_flood_risk_mitigation: 'urban-flood',
  wind_energy: 'wind-energy',
  scenario_generator_proximity: 'scenario-generator',
  wave_energy: 'wave-energy',
};

/**
 * Open the target href in the default web browser.
 */
function handleClick(event) {
  event.preventDefault();
  ipcRenderer.send(
    ipcMainChannels.OPEN_EXTERNAL_URL, event.currentTarget.href
  );
}

/** Render model-relevant links to the User's Guide and Forum.
 *
 * This should be a link to the model's User's Guide chapter and
 * and a link to list of topics with the model's tag on the forum,
 * e.g. https://community.naturalcapitalproject.org/tag/carbon
 */
export default function ResourcesTab(props) {
  let userGuideURL = UG_ROOT;
  let forumURL = FORUM_ROOT;
  const { docs, moduleName } = props;
  const tagName = FORUM_TAGS[moduleName];
  if (docs) {
    const docsName = docs;
    userGuideURL = `${UG_ROOT}/${docsName}#data-needs`;
  }
  if (tagName) {
    forumURL = `${FORUM_ROOT}/tags/${tagName}`;
  }
  return (
    <React.Fragment>
      <a
        href={userGuideURL}
        title={userGuideURL}
        aria-label="go to user guide in web browser"
        onClick={handleClick}
      >
        <MdOpenInNew className="mr-1" />
        {_("User's Guide")}
      </a>
      <a
        href={forumURL}
        title={forumURL}
        aria-label="go to user support forum in web browser"
        onClick={handleClick}
      >
        <MdOpenInNew className="mr-1" />
        {_("Frequently Asked Questions")}
      </a>
    </React.Fragment>
  );
}

ResourcesTab.propTypes = {
  moduleName: PropTypes.string,
  docs: PropTypes.string,
};
ResourcesTab.defaultProps = {
  moduleName: undefined,
  docs: '',
};
