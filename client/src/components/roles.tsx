import { useEffect } from "react";
import RolesRow from "./RolesRow";
import useAppProvider from "../provider/hook";
import axios from "axios";

export default function Roles() {
  const uAppProvider = useAppProvider();

  const filteredAndSortedRoles = uAppProvider?.roles?.filter((r) => {
    const rolePermission = uAppProvider?.filterRoles?.permission;
    let hasAllPermission = true;

    rolePermission?.forEach((p) => {
      if (!r?.permissions.includes(p)) {
        return (hasAllPermission = false);
      }
    });

    if (hasAllPermission) {
      return r;
    }
  });

  useEffect(() => {
    uAppProvider?.setToggleMenu("role");
    if(uAppProvider?.roles.length == 0){
      axios
      .get(`${import.meta.env.VITE_SERVER_API_URl}/role`)
      .then((data) => {
        uAppProvider?.setRoles(data?.data?.role)
      })
      .catch((err) => {
        console.log("Error on geting roles : ", err);
        
      });
    }
  }, [uAppProvider?.roles]);

  return (
    <div className=" w-full h-full">
      <div className="  w-full overflow-hidden overflow-x-visible">
        <table className=" w-full text-left text-lg ">
          <thead className="bg-white text-black rounded-md text-sm lg:text-lg">
            <tr>
              <th className="p-2" rowSpan={2}>
                <p>Name</p>
              </th>
              <th colSpan={3} className="text-center">
                Permission
              </th>
              <th> </th>
            </tr>
            <tr className="text-center">
              <th>Read</th>
              <th>Write</th>
              <th>Delete</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedRoles?.map((r, index) => (
              <RolesRow
                name={r?.name}
                index={index}
                _id={r?._id}
                permissions={r?.permissions}
                key={r?._id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
