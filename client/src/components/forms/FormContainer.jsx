import "react";
import PropTypes from "prop-types";

const FormContainer = ({
  children,
  title,
  subtitle = "",
  icon: Icon = null,
  error = null,
  onSubmit,
}) => {
  return (
    <div className="min-h-[100%] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          {Icon && <Icon className="mx-auto text-4xl text-blue-600 mb-2" />}
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>

        <form onSubmit={onSubmit}>
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {children}
        </form>
      </div>
    </div>
  );
};
FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.elementType,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default FormContainer;
