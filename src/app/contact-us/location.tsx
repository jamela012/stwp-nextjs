export default function Location() {
    return (
        <div className="flex flex-wrap mt-20 sm:p-5">
            <div className="flex flex-col md:flex-row w-full">
                <div className="mt-4 p-5 flex flex-col flex-1 justify-center items-start">
                    <div className="p-4">
                        <h1 className="text-5xl text-logo-color font-semibold mb-5">Our Location</h1>
                        <div className="flex mb-7">
                            <svg 
                                className="w-[48px] h-[48px] text-gray-800 dark:text-logo-color mb-3" 
                                aria-hidden="true" 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="24" 
                                height="24" 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    fillRule="evenodd" 
                                    d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" 
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className="text-lg font-medium pl-4"> 
                                Q38F+C5Q Don Florencio Village, Gov. Antonio Carpio Rd, Batangas, 4200 Batangas 
                            </p>
                        </div>
                        
                    </div>
                </div>
                <div className="flex justify-center items-center w-full md:w-1/2 h-64 md:h-96 overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1278.3432946129947!2d121.07232549368713!3d13.766077842032216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd055167f734bb%3A0x27d57ad9269483e3!2sShepherd%20The%20Wedding%20Planner!5e0!3m2!1sen!2sph!4v1722413790348!5m2!1sen!2sph"
                        className="w-full h-full border-none"
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}