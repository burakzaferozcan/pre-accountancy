import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyInfoById } from "../slices/company/CompanySlice";
import { useParams } from "react-router-dom";

function CompanyBalance() {
  const dispatch = useDispatch();
  const params = useParams();
  const companyID = params.id;
  const { balanceTable, isBalanceRefresh } = useSelector(
    (state) => state.company
  );

  React.useEffect(() => {
    if (isBalanceRefresh) {
      dispatch(getCompanyInfoById(companyID));
    }
  }, [isBalanceRefresh, companyID]);

  return (
    <div className="card mt-4" style={{ padding: "5px", width: "97%" }}>
      <div className="d-flex flex-column">
        <div className="d-flex col-12 gap-1">
          <div className="d-flex-col-6">
            <label htmlFor="debts">
              Alacak :{" "}
              <strong>
                {Number(balanceTable.totalDebts).toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                })}
              </strong>
            </label>
            <label htmlFor="collections">
              Ödeme :{" "}
              <strong>
                {Number(balanceTable.totalCollections).toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                })}
              </strong>
            </label>
          </div>
        </div>
        <div className="d-flex col-12 gap-1">
          <div className="d-flex-col-6"></div>
          <div className="d-flex-col-6">
            <label htmlFor="balance">
              Bakiye :{" "}
              <strong>
                {Number(balanceTable.balance).toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                })}
              </strong>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyBalance;
