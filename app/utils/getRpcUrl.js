import random from 'lodash/random'
import {chainInfo, REACT_APP_NETWORK_ID} from "../chainInfo";

// Array of available nodes to connect to
export let nodes = [chainInfo[REACT_APP_NETWORK_ID].REACT_APP_NODE_1, chainInfo[REACT_APP_NETWORK_ID].REACT_APP_NODE_2]

const getNodeUrl = () => {
  nodes = [chainInfo[REACT_APP_NETWORK_ID].REACT_APP_NODE_1, chainInfo[REACT_APP_NETWORK_ID].REACT_APP_NODE_2]
  const randomIndex = random(0, nodes.length - 1)
  return nodes[randomIndex]
}

export default getNodeUrl