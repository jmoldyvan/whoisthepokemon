import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from "firebase-admin/auth";

// import serviceAccountKey from './serviceAccountKey.json' assert { type: "json" };
 
const app = initializeApp({
    credential: cert({
      "type": "service_account",
      "project_id": "pokemonauth-86947",
      "private_key_id": "fdb774418c56e120765e277de69184a18d199d47",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCgUo+xsgezH+QH\nJQt/DWw2tUbnv0m6xDSqtj9ZAjPxY+bsnBkoQfgwSPwsW60l+LlMo/oAS54AGg3n\n1qTTfCvUnDW1X65WzNWxGEGVf+1JDYQI4q6h+C2k7+33Z8jrVJYF7zS/AuBVb+Er\nE7Y72r2mUk3SRGJX+kRjRkZ63o+hR2+JqbbbiZ/4wG/GCRYR97WqvzBboxRRTFWc\nwrxtgW2fPOLp1fXDlncSDRP5CXqrSV0LnqXmR3CVrrudM9JfvpOgfuKM2mI2UsxE\n7vziQN8KJoCe9jfBj66QRXkxd5vg564owG12CjOmH/wtisCd/ydufyrifXe13/Yw\nPoQ+WGKfAgMBAAECggEAL1eB8CaSqH3jz4pMZUW47UTFfdyaMIkMxlZPyYBhh0gJ\nYlhMA3vLhrKeqJifviU+zpdjVR//Nad78LiM7phttvgz0e3BpQcSmRuBDlz63EYd\n9aO+jryi+eARxKuEhJ1zOahjyn3WcdQ6SQammvEibJFEQrGH2tPfyvLvEAxVnHls\naZD9U4cqDPpGswXatCrdW2X3oKdvfhKCqU9yjj68w5tlK0f9LhhjBes+Q/7B2GEt\n+fOmxvwNQNzpbt4Ch5HwLNQBtw/uoqmDo50l6opLo5BlVUGjncV3xGBYpy9/GSnK\noKy8RRu9tW6BIjLX0NbkbiZ+tpOmhJp9Y6q1BPc5gQKBgQDWjvXFvzBHhoawiLKu\n1ZDpoD0OQsaP8+uSSItf2xqMJq0dc8yHtMuK5UzdA9emSp1pwGUrNDsP3TYMMQhw\n4Kw75EaqR+inAPkP/CQtymLLNtEAKNbzDVJ2mMHWvGfc3NNtawz/2BH+qk3uT3QO\nH8OjqfWBqYnfXC8O4npeHd9JHwKBgQC/SdsDUAZ9PR3LGfUy8A3AKkqj6T0iZWhR\n4r/W4m3TUZotprOXm01q9rQHbOxiIUFK8v82XPQDywxf+fvcEzV0Mu16wqFz8/6K\n3lPM69qwSpK3irm8i/U8i7+mnfzfTdQBh7s7zS5b+nLWFM0TPFAzPXcEgM8tK+2A\nl0Eqs5g2gQKBgQCPsHokDqBUpmE5hLK1p80+yNNa45l6+o3/D5pXfbLPvW8eVFjb\nYVcXE+1f7pzTfxDgq7qVLouHWkxB6eyPO8fc7Enu6+2BOoOSEvhfujRjh7h8dN1P\nNNLPHgpitxaPsUve8VxpUtjqRj+eo5NDij5JMx950ILHFUNmooH02eiZXQKBgQCq\n8c6GZFKYQzDH2zezwLEZJPI1Du+yOFuEqhV0bD9nVIpq94mRF5mU2ElERYPtofhe\niU+nfmQWq7MwZg88ufHQGN7/EMYGAGteIJdVDwUM/GenHJMluxF6fQzVUmS0DjJC\n99BL/e3LBsLvLAGkigbF88zTumTq4lHJ0+HJzltdgQKBgDfaegqJLO1Rj3lC2aqk\n0aGiITIV2gzez1uloV3cr7nxPUDwrzQq/LB5NW/ERusHrqT4lWMtQWzOryDhkvsU\nI5ZDkUR3xjhdXoaBmQYIzwZbgYk8qPTa59P4ajMfpwSdDyvCRfRMjPThsS/Ob6su\nLO9jthJ7vggm/SlQnSqC3HaN\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-50pvt@pokemonauth-86947.iam.gserviceaccount.com",
      "client_id": "112784248636526691477",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-50pvt%40pokemonauth-86947.iam.gserviceaccount.com"
    }),
  });
  
  const auth = getAuth(app);


export default auth