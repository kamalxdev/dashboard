import { useEffect } from "react";
import roles from "../data/roles.json";
import RolesRow from "./RolesRow";
import useAppProvider from "../provider/hook";

export default function Roles() {
  const uAppProvider = useAppProvider();

  const filteredAndSortedRoles = roles.filter((r) => {
    const rolePermission = uAppProvider?.filterRoles?.permission
    let hasAllPermission = true
    
    rolePermission?.forEach((p)=>{
      if(!r?.permissions.includes(p)){
        return hasAllPermission=false
      }
    })
    
    if(hasAllPermission) {
      return r
    }
    
  });

  useEffect(() => {
    uAppProvider?.setToggleMenu("role");
  }, []);

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
                id={r?.id}
                permissions={r?.permissions}
                key={r?.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
