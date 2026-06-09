import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function AdminReports() {

  const [reports, setReports] =
    useState([]);

  useEffect(() => {

    fetchReports();

  }, []);

  const fetchReports = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/reports"
        );

      setReports(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };


const deleteReport = async (
  reportId
) => {

  try {

    await axios.delete(
      `http://localhost:5000/api/reports/${reportId}`
    );

    fetchReports();

  } catch (error) {

    console.log(error);

  }

};


  return (

    <div className="flex min-h-screen bg-[#071326] text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Reports 🚩
        </h1>

        {reports.map(
          (report) => (

            <div
              key={report._id}
              className="bg-slate-900 p-5 rounded-xl mb-4"
            >

              <p>
                <strong>
                  Reporter:
                </strong>{" "}
                {report.reportedBy}
              </p>

              <p>
                <strong>
                  Type:
                </strong>{" "}
                {report.type}
              </p>

              <p>
                <strong>
                  Reason:
                </strong>{" "}
                {report.reason}
              </p>



              <button
  onClick={() =>
    deleteReport(report._id)
  }
  className="bg-gradient-to-r from-red-500 to-red-700 px-4 py-2 rounded mt-3"
>
  Dismiss Report
</button>

            </div>

          )
        )}

      </div>

    </div>

  );

}

export default AdminReports;