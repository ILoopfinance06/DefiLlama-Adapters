const ADDRESSES = require('../helper/coreAssets.json')
const { sumTokens2 } = require('../helper/unwrapLPs');
const { pool2s } = require("../helper/pool2");

const RESERVE_HOLDER = '0xc36303ef9c780292755B5a9593Bfa8c1a7817E2a';
const CHI_STAKING = '0xaB1dCa1C0f948c268652eedC676966002Ae241c6';
const CHI_LOCKING = '0xE3dD17ff009bAC84e32130fcA5f01C908e956603';
const CHI_VESTING = '0x426DBAa2B33cE1B833C13b72503F5128AFef79fC';
const STETH = ADDRESSES.ethereum.STETH;
const WETH = ADDRESSES.ethereum.WETH
const WEETH = ADDRESSES.ethereum.WEETH;
const CHI = '0x3b21418081528845a6DF4e970bD2185545b712ba';

const stakingPool2Contracts = [
    "0x85CD2803223C864D625b1D289fDD3Cee7e4bB307",
    "0xD66DAbE0c898Ec74DA03AE4e90b9c051408685e6",
];
const lpAddresses = [
    "0x88d1fFB9F94Fc881ea0D83Dddcdb196EE9DA8739",
    "0x9f93F419d0267877247A39b4eb6b2775AbAC6bdc",
];

async function tvl(api) {
    const owner = RESERVE_HOLDER;
    const tokens = [
        STETH,
        WETH,
        WEETH,
    ];
    return sumTokens2({ owner, tokens, api })
}

async function staking(api) {
    const tokensAndOwners = [
        [CHI, CHI_STAKING],
        [CHI, CHI_LOCKING]
    ];
    return sumTokens2({ api, tokensAndOwners })
}

async function vesting(api) {
    const owner = CHI_VESTING;
    const tokens = [
        CHI
    ];
    return sumTokens2({ owner, tokens, api })
}

module.exports = {
    ethereum: {
        tvl: tvl,
        staking: staking,
        pool2: pool2s(stakingPool2Contracts, lpAddresses),
        vesting: vesting
    }
}
