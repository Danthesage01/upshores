import React from "react";
import { useGetTalentsQuery } from "../../Services/talentApi";
import { TalentsComp } from "../../components/Global/TalentsComp";
import SmallLoader from "../../components/Global/SmallLoader";

export const CompanyDashboard = () => {
  const {
    data: talentData,
    isLoading: isTalentLoading,
    isFetching: isTalentFetching,
  } = useGetTalentsQuery();

  if (isTalentFetching || isTalentLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-gray-100">
        <SmallLoader favColor={true} />
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen py-20 bg-gray-100">
        <TalentsComp
          isTalentFetching={isTalentFetching}
          isTalentLoading={isTalentLoading}
          talentData={talentData}
        />
      </div>
    </>
  );
};
