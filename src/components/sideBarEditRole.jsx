
import { Button, Drawer, DrawerHeader, DrawerItems, Label, Textarea, TextInput } from "flowbite-react";
import Stacks from "../components/enumStacks";
import { useState, useEffect } from "react";

export default function SideBarEditRole({ isOpen, onClose, roleData }) {
    const [selectedStacks, setSelectedStacks] = useState([]);
    const [showStacksMenu, setShowStacksMenu] = useState(false);

    // Sincroniza com roleData quando mudar
    useEffect(() => {
        if (roleData?.stacks) {
            setSelectedStacks(roleData.stacks);
        }
    }, [roleData]);

    const handleAddStack = (stack) => {
        if (!selectedStacks.includes(stack)) {
            setSelectedStacks([...selectedStacks, stack]);
        }
        setShowStacksMenu(false);
    };

    const handleRemoveStack = (stackToRemove) => {
        setSelectedStacks(selectedStacks.filter(stack => stack !== stackToRemove));
    };

    return (
        <>
            <Drawer open={isOpen} onClose={onClose} position="right">
                <DrawerHeader title="Edit Role" />
                <DrawerItems>
                    {roleData ? (
                        <form action="#">
                            <div className="mb-6 mt-3">
                                <Label htmlFor="roleName" className="mb-2 block">
                                    Role Name
                                </Label>
                                <TextInput
                                    id="roleName"
                                    name="roleName"
                                    defaultValue={roleData.name}
                                    placeholder="e.g. Frontend Developer"
                                />
                            </div>
                            <div className="mb-6">
                                <Label htmlFor="description" className="mb-2 block">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={roleData.description}
                                    placeholder="Describe the role responsibilities..."
                                    rows={4}
                                />
                            </div>
                            <div className="mb-6">
                                <Label htmlFor="stacks" className="mb-2 block">
                                    Technologies
                                </Label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {selectedStacks.map(stack => (
                                        <span 
                                            key={stack} 
                                            className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded"
                                        >
                                            {Stacks[stack] || stack}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveStack(stack)}
                                                className="ml-1 text-blue-600 dark:text-blue-300 hover:text-red-600 dark:hover:text-red-400"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                    
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setShowStacksMenu(!showStacksMenu)}
                                            className="inline-flex items-center justify-center w-6 h-6 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                                        >
                                            +
                                        </button>
                                        
                                        {showStacksMenu && (
                                            <div className="absolute z-10 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                {Object.keys(Stacks).filter(stack => !selectedStacks.includes(stack)).map(stack => (
                                                    <button
                                                        key={stack}
                                                        type="button"
                                                        onClick={() => handleAddStack(stack)}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    >
                                                        {Stacks[stack]}
                                                    </button>
                                                ))}
                                                {Object.keys(Stacks).filter(stack => !selectedStacks.includes(stack)).length === 0 && (
                                                    <p className="px-4 py-2 text-sm text-gray-500">All stacks added</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 flex gap-2">
                                <Button type="submit" className="w-full" color="blue">
                                    Save Changes
                                </Button>
                                <Button type="button" className="w-full" color="gray" onClick={onClose}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">
                            No role selected
                        </p>
                    )}
                </DrawerItems>
            </Drawer>
        </>
    );
}
