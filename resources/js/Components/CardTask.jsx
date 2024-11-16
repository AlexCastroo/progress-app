

export default function CardTask ({...props}) {
    return (
        
        <a href="#" class="block max-w-lg p-6 bg-slate-700 bg-opacity-20 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            
            <h5 
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {props.task.title}
                </h5>
            <h5 
            class="mb-2 text-xs font-light tracking-tight  text-gray-900 dark:text-white">
                {props.user}
                </h5>
            <p 
                class="font-normal text-gray-700 dark:text-gray-400">
                {props.task.description}
                </p>
            <div className="d-flex flex-row">
                <button 
                    type="button"
                    class="w-40 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    Edit
                </button>
                <button 
                    type="button"
                    class="w-40 text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    Delete
                </button>
            </div>
        </a>

    );
}