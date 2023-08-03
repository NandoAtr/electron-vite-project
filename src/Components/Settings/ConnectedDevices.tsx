import PropTypes from "prop-types";

type Devices = {
  id: string;
  name: string;
  type: string;
  status: string;
  lastLoginDate: Date;
};

function ConnectedDevices( {devices} : any) {
  // const devices = [
  //   {
  //     id: 1,
  //     name: "Smart TV",
  //     type: "Television",
  //     status: "Connected",
  //     lastLoginDate: "2022-02-25T12:30:00Z",
  //   },
  //   {
  //     id: 2,
  //     name: "Amazon Echo",
  //     type: "Smart Speaker",
  //     status: "Connected",
  //     lastLoginDate: "2022-02-24T10:15:00Z",
  //   },
  //   {
  //     id: 3,
  //     name: "Philips Hue Light Bulbs",
  //     type: "Smart Lighting",
  //     status: "Disconnected",
  //     lastLoginDate: "2022-02-23T08:45:00Z",
  //   },
  //   {
  //     id: 4,
  //     name: "Nest Thermostat",
  //     type: "Smart Thermostat",
  //     status: "Connected",
  //     lastLoginDate: "2022-02-22T16:20:00Z",
  //   },
  //   {
  //     id: 5,
  //     name: "Smart Lock",
  //     type: "Smart Lock",
  //     status: "Disconnected",
  //     lastLoginDate: "2022-02-21T14:10:00Z",
  //   },
  // ];

  return (
    <ul className="grid gap-4">
      {devices?.map((device:any) => (
        <li key={device.id} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-2">{device.name}</h3>
          <p className="text-gray-600 mb-1">Type: {device.type}</p>
          <p className="text-gray-600 mb-2">
            Last login: {device.lastLoginDate.toLocaleString()}
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ConnectedDevices;
