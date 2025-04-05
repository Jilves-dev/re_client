import { Badge } from "antd";
import { Link } from "react-router-dom";
import AdFeatures from "./AdFeatures";
import { formatNumber } from "../../helpers/ad";

export default function UserAdCard({ ad, className}) {
const userAdCardClassName = `${className} relative z-10`;
  return (
    <div className={userAdCardClassName}> 
      <Link to={`/user/ad/${ad.slug}`}>
        <Badge.Ribbon
          text={`${ad?.type} for ${ad?.action}`}
          color={`${ad?.action === "Sell" ? "#90AEAD" : "#874F41"}`}
        >
          <div className="card hoverable shadow-lg shadow-gray-600 rounded-md my-card pb-4 w-90 h-100">
            <img
              src={ad?.photos?.[0].Location}
              alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`}
              className="w-full h-80 object-cover"
            />

            <div className="card-body">
              <h3 className="text-2xl pl-2 pt-6 pb-1 font-semibold">{formatNumber(ad?.price)}€</h3>
              <p className="text-md text-gray-600 pl-2 pb-2">{ad?.address}</p>

              <AdFeatures ad={ad} />
            </div>
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
}