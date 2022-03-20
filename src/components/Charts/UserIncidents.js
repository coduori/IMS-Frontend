import {React, useEffect, useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button} from "@blueprintjs/core"

import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import UserContext from '../../store/UserContext';

const UserIncidentChart = (props) => {

    const usercontext = useContext(UserContext);
    // const [chartData, setChartData] = useState({
    //   approvedIncidents: 0,
    //   closedIncidents: 0,
    //   openIncidents: 0
    // })
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        
        const errors = []
        const get_chart_data_info = 'http://localhost:3006/reports/data/userincidents';
        let refreshed_access_token = false;
        async function fetchData() {
          const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
          };
          console.log("Making request")
          console.log(usercontext.accessToken);
            try {
                const response = await fetch(get_chart_data_info, options);
                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData);
                    const labels = ['APPROVED', 'OPEN', 'CLOSED']
                    setChartData({
                      labels: labels,
                      datasets: [
                        {
                          label: 'Number of Incidents',
                          data: labels.map((labelname) => {
                            
                            if (labelname == 'APPROVED') {
                              console.log(parseInt(responseData.reportdata.approvedIncidentsCount));
                              return parseInt(responseData.reportdata.approvedIncidentsCount)
                            } else if (labelname == 'CLOSED') {
                              console.log(parseInt(responseData.reportdata.closedIncidentsCount));
                              return parseInt(responseData.reportdata.closedIncidentsCount)
                            } else if (labelname == 'OPEN') {
                              console.log(parseInt(responseData.reportdata.openIncidentsCount));
                              return parseInt(responseData.reportdata.openIncidentsCount)
                            }
                            return 4
                          }),
                          borderColor: 'rgb(255, 99, 132)',
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(65, 99, 132, 0.5)',
                            'rgba(255, 137, 132, 0.5)'
                          ],
                        }
                      ]
                    });
                } else {
                    const responseData = await response.json();
                    if (responseData.error && responseData.error === "EXPIRED_ACCESS_TOKEN") {
                      console.log("Refreshing token")
                      console.log(usercontext.accessToken);
                      const refresh_access_token_url = 'http://127.0.0.1:3000/auth/token/refresh'
                      const refresh_options = {
                        method: 'GET',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
                        },
                      };
                      const refreshTokenResponse = await fetch(refresh_access_token_url, refresh_options);

                      if(refreshTokenResponse.ok) {
                        const responseData = await refreshTokenResponse.json();
                        usercontext.setAccessToken(responseData.accessToken)
                        console.log("New token")
                        console.log(responseData.accessToken);
                        console.log(usercontext.accessToken);
                        refreshed_access_token = true
                      } else {
                        console.log("Error Refreshing Token")
                        errors.push({message: "Error Refreshing Token"})
                      }
                    } else {
                      console.log(responseData);
                      errors.push({message: "Error Fetching Chart Data"})
                    }
                }
            } catch (failedResponse) {
            // console.log(await failedResponse.data)
            }
        }

        fetchData();
        if (refreshed_access_token) {
          fetchData();
        }
        if (errors.length > 0) {
          props.setErrorNotifications(errors)
        }
    }, [usercontext.refreshToken, usercontext.accessToken, usercontext.setAccessToken]);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
      
      const options = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: `${usercontext.name.split(' ')[0]}'s recorded Incidents`,
          },
        },
      };
      
      // const labels = ['APPROVED', 'OPEN', 'CLOSED'];
      // const data = {
      //   labels,
      //   datasets: [
      //     {
      //       label: 'Number of Incidents',
      //       data: labels.map((labelname) => {
              
      //         if (labelname == 'APPROVED') {
      //           console.log(chartData.approvedIncidents);
      //           return chartData.approvedIncidents
      //         } else if (labelname == 'CLOSED') {
      //           console.log(chartData.closedIncidents);
      //           return chartData.closedIncidents
      //         } else if (labelname == 'OPEN') {
      //           console.log(chartData.openIncidents);
      //           return chartData.openIncidents
      //         }
      //         return 4
      //       }),
      //       borderColor: 'rgb(255, 99, 132)',
      //       backgroundColor: [
      //         'rgba(255, 99, 132, 0.5)',
      //         'rgba(65, 99, 132, 0.5)',
      //         'rgba(255, 137, 132, 0.5)'
      //       ],
      //     }
      //   ],
      // };
    return (
        <>
            <div className="chart-section-header"></div>
            <div className="chart-section-content">
              {/* <Bar data={chartData} options={options}/> */}
            </div>
            <div className="chart-section-footer">
              <Link to="/incidents">
                <Button className="mt-2" text="See Incidents" intent="success" small={true}/>
                {/* <button className="mt-2 btn btn-primary">See Incidents</button> */}
              </Link>
            </div>
        </>
    )
}

export default UserIncidentChart
