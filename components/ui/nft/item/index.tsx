/* eslint-disable @next/next/no-img-element */

import { FunctionComponent } from "react";
import { NftMeta, Nft } from "../../../../types/nft";

type NftItemProps = {
  item: Nft;
  buyNft: (token: number, value: number) => Promise<void>;
}

function shortifyAddress(address: string) {
  return `0x****${address.slice(-4)}`
}

const NftItem: FunctionComponent<NftItemProps> = ({item, buyNft}) => {
  return (
    <>
      <div className="flex-shrink-0">
        <img
          className={`h-full w-full object-cover`}
          src={item.meta.image}
          alt="New NFT"
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center mt-2">
              <div>
                {/* {console.log("item", item)} */}
                {(item.creator != "0xE387cc52A9281F03B38cc9d0F41358D6303b98fA") ?
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src="/images/default_avatar.png"
                    alt=""
                  /> 
                  :
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src="/images/default_avatar2.png"
                    alt=""
                  /> 
                }
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Creator</p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">{shortifyAddress(item.creator)}</p>
              </div>
            </div>
            <p className="text-sm font-medium text-indigo-600">
              Non-Fungible
            </p>
          </div>
          <div className="block mt-2">
            <p className="text-xl font-semibold text-gray-900">{item.meta.name}</p>
            <p className="mt-3 mb-3 text-base text-gray-500">{item.meta.description}</p>
          </div>
        </div>
        {(item.price != 0.00001) ? 
          <>
            <div className="overflow-hidden mb-4">
            <dl className="-mx-4 -mt-4 flex flex-wrap">
              <div className="flex flex-col px-4 pt-4">
                <dt className="order-2 text-sm font-medium text-gray-500">Price</dt>
                <dd className="order-1 text-xl font-extrabold text-indigo-600">
                  <div className="flex justify-center items-center">
                    {item.price}
                    <img className="h-6" src="/images/small-eth.webp" alt="ether icon"/>
                  </div>
                </dd>
              </div>
              { item.meta.attributes.map(attribute =>
                <div key={attribute.trait_type} className="flex flex-col px-4 pt-4">
                  <dt className="order-2 text-sm font-medium text-gray-500">
                    {attribute.trait_type}
                  </dt>
                  <dd className="order-1 text-xl font-extrabold text-indigo-600">
                    {attribute.value}
                  </dd>
                </div>
              )}
            </dl>
            </div>
            <div>
            <button
              onClick={() => {
                buyNft(item.tokenId, item.price);
              }}
              type="button"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Buy
            </button>
            </div>
          </>
          :
          <>
          <div className="overflow-hidden mb-4">
          <dl className="-mx-4 -mt-4 flex flex-wrap">
            <div className="flex flex-col px-4 pt-4">
              <dt className="order-2 text-sm font-medium text-gray-500">Degree</dt>
              <dd className="order-1 text-xl font-extrabold text-indigo-600">
                <div className="flex justify-center items-center">
                {/* src="/images/page_logo.png" */}
                  <img className="h-6" src="https://i.ibb.co/rcWkt9t/pngwing-com.png" alt="degree icon"/>
                </div>
              </dd>
            </div>
            { item.meta.attributes.map(attribute =>
              <div key={attribute.degree_trait_type } className="flex flex-col px-4 pt-4">
                <dt className="order-2 text-sm font-medium text-gray-500">
                  {attribute.degree_trait_type}
                </dt>
                <dd className="order-1 text-xl font-extrabold text-indigo-600">
                  {attribute.value}
                </dd>
              </div>
            )}
          </dl>
          </div>
          <div>
            <button
              onClick={() => {
                const issued_to = item.meta.attributes[0].value.toLowerCase()
                const current_account = window.ethereum.selectedAddress?.toLowerCase()
                if(issued_to && current_account)
                {
                  console.log("issued_to: ", issued_to)
                  console.log("current_account: ", current_account)
                  console.log("item.tokenId: ", item.tokenId)
                  console.log("item.price: ", item.price)
                  if(issued_to == current_account){
                    buyNft(item.tokenId, item.price);
                  } else {
                    alert("This degree can only be calimed by the intended person.")
                  }
                }
              }}
              type="button"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Collect
            </button>
            </div>
          </>
          }
  
      </div>
    </>
  )
}

export default NftItem;
