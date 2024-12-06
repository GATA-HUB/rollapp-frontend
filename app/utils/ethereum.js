import { UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'

export function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return 'Install MetaMask'
  } else if (error instanceof UnsupportedChainIdError) {
    return "Wrong Network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected
  ) {
    return 'Unauthorized Access'
  } else {
    console.error(error)
    return 'Unknown Error'
  }
}
