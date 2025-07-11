
export const CustomerPage = () => {

    return (
        <div className="min-h-screen bg-white">
            <div className="flex flex-col md:flex-row h-screen">

                {/* Lado Izquierdo */}
                <div className="md:w-1/2 w-full text-white flex flex-col justify-center items-center p-10"
                    style={{ background: "#8C34D0" }}>
                    <h1 className="text-3xl md:text-[40px] l font-bold mb-12 text-center">
                        Bienvenido a BlackCat
                    </h1>
                    <p className="text-2xl md:text-[30px] text-center">
                        Tu tienda favorita con los productos que necesitas al menor precio y mayor calidad
                    </p>
                    <p className="mt-10 text-xs md:text-sm text-gray-200 text-center">
                        © 2025 BlackCat. Todos los derechos reservados.
                    </p>
                </div>


                {/* Lado derecho */}

                <div className="md:w-1/2 w-full flex flex-col items-center justify-center bg-white px-6 py-10">
                    <div className="w-full max-w-md">

                        {/* Titulo y subtitulo */}
                        <h1 className="text-2xl md:text-[30px] font-medium mb-2 text-center md:text-left">Crea tu cuenta</h1>

                    
                    </div>
                </div>

            </div>
        </div>
    );
}