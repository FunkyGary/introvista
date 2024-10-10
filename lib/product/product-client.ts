import { type Firestore, getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase-config";

class ProductClient {
  db: Firestore;
  constructor() {
    this.db = getFirestore(firebaseApp);
  }

  async createProduct(data: any): Promise<{ error?: string }> {
    return {};
  }
}

export const productClient = new ProductClient();
