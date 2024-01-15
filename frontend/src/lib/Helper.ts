export const  shortenEthereumAddress=(address : string) =>{
    if(address){

        return address.substring(0, 5) + '...' + address.substring(address.length - 3) ;
    }else{
        return ''
    }
}

