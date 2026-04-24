export default class CartState{

    private productData = new Map<string, string>();

    addProduct(productName: string, productPrice: string){
        this.productData.set(productName, productPrice);
    }
    removeProduct(productName: string){
        this.productData.delete(productName);
    }
    getPrice(productName: string){
        return this.productData.get(productName);
    }

    getAll(){
        return this.productData;
    }

    getCount(){
        return this.productData.size;
    }

    getTotalPrice(){
        let sum = 0;
        for(const temp of this. productData.values())
        {
            sum += Number(temp.replace("$",""));
        }
        return sum;
    }
    getTax(){
       return  Number(((this.getTotalPrice() / 100)*8).toFixed(2))
    }
}