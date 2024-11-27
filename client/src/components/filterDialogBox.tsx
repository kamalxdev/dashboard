import { memo } from "react";
import { FaXmark } from "react-icons/fa6";
import roles from "../data/roles.json";
import useAppProvider from "../provider/hook";

function FilterDialogBox() {
  const uAppProvider = useAppProvider();

  return (
    <section className="text-white transition-all absolute bg-black/80 inset-0 w-dvh h-dvh flex items-center justify-center z-40">
      <div className="relative transition-all min-w-80 max-w-80 lg:max-w-96 flex flex-col gap-2 bg-black p-5 border border-zinc-800 rounded-sm">
        <span className=" relative w-full flex flex-col justify-end items-end">
          <button
            onClick={() => uAppProvider?.setToggleFilter(false)}
            className="transition-all p-1 hover:bg-zinc-800 rounded-md"
          >
            <FaXmark />
          </button>
          <h1 className=" w-full text-center font-bold">
            Filter {uAppProvider?.toggleMenu == "user" ? "Users" : "Roles"}
          </h1>
        </span>
        {uAppProvider?.toggleMenu == "user" ? (
          <FilterForUser />
        ) : (
          <FilterForRole />
        )}
      </div>
    </section>
  );
}

const FilterForUser = memo(function FilterForUser() {
  const uAppProvider = useAppProvider();

  function handlOnRoleClick(name: string) {
    const currentRoles = uAppProvider?.filterUsers?.roles;

    if (!currentRoles.includes(name)) {
      return uAppProvider?.setFilterUsers({
        ...uAppProvider?.filterUsers,
        roles: [...currentRoles, name],
      });
    }

    const updateRoles = currentRoles.filter((r) => r != name);

    return uAppProvider?.setFilterUsers({
      ...uAppProvider?.filterUsers,
      roles: updateRoles,
    });
  }

  function handlOnStatusClick(name: "Active" | "Inactive") {
    const currentStatus = uAppProvider?.filterUsers?.status;

    if (currentStatus != name) {
      return uAppProvider?.setFilterUsers({
        ...uAppProvider?.filterUsers,
        status: name,
      });
    }

    return uAppProvider?.setFilterUsers({
      ...uAppProvider?.filterUsers,
      status: null,
    });
  }
  return (
    <>
      <span className=" relative flex flex-col gap-2">
        <h3 className="font-semibold">Roles</h3>
        <span className="flex gap-2 flex-wrap">
          {roles?.map((r) => (
            <button
              key={r?.name}
              onClick={() => handlOnRoleClick(r?.name)}
              className={`px-2 py-1 border transition-all border-zinc-800 rounded-md hover:border-white  ${
                uAppProvider?.filterUsers?.roles.includes(r?.name) &&
                "bg-zinc-800"
              } `}
            >
              {r?.name}
            </button>
          ))}
        </span>
      </span>
      <span className="relative flex flex-col gap-2">
        <h3 className="font-semibold">Status</h3>
        <span className="flex gap-2">
          <button
            onClick={() => handlOnStatusClick("Active")}
            className={`px-2 py-1 border transition-all border-zinc-800 rounded-md hover:border-white  ${
              uAppProvider?.filterUsers?.status == "Active" && "bg-zinc-800"
            } `}
          >
            Active
          </button>
          <button
            onClick={() => handlOnStatusClick("Inactive")}
            className={`px-2 py-1 border transition-all border-zinc-800 rounded-md hover:border-white  ${
              uAppProvider?.filterUsers?.status == "Inactive" && "bg-zinc-800"
            } `}
          >
            Inactive
          </button>
        </span>
      </span>
    </>
  );
});

const FilterForRole = memo(function FilterForRole() {

  const uAppProvider = useAppProvider();

  function handlOnPermissionClick(permission: string) {
    const currentPermission = uAppProvider?.filterRoles?.permission;

    if (!currentPermission.includes(permission)) {
      return uAppProvider?.setFilterRoles({
        ...uAppProvider?.filterRoles,
        permission: [...currentPermission, permission],
      });
    }

    const updatedPermission = currentPermission.filter((p) => p != permission);

    return uAppProvider?.setFilterRoles({
      ...uAppProvider?.filterRoles,
      permission: updatedPermission,
    });
  }
  
  return (
    <span>
      <span className=" relative flex flex-col gap-2">
        <h3 className="font-semibold">Permission</h3>
        <span className="flex gap-2">
          {["Read", "Write", "Delete"]?.map((permission) => (
            <button
              key={permission}
              onClick={() => handlOnPermissionClick(permission)}
              className={`px-2 py-1 border transition-all border-zinc-800 rounded-md hover:border-white  ${
                uAppProvider?.filterRoles?.permission?.includes(permission) &&
                "bg-zinc-800"
              } `}
            >
              {permission}
            </button>
          ))}
        </span>
      </span>
    </span>
  );
});

export default memo(FilterDialogBox);
