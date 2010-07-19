package com.nitobi.servlet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * User: eric
 * Date: Nov 16, 2008
 * Time: 1:09:14 PM
 */
public class NitobiThemeServlet extends HttpServlet {
    /**
     * Called by the server (via the <code>service</code> method) to
     * allow a servlet to handle a GET request.
     * <p/>
     * <p>Overriding this method to support a GET request also
     * automatically supports an HTTP HEAD request. A HEAD
     * request is a GET request that returns no body in the
     * response, only the request header fields.
     * <p/>
     * <p>When overriding this method, read the request data,
     * write the response headers, get the response's writer or
     * output stream object, and finally, write the response data.
     * It's best to include content type and encoding. When using
     * a <code>PrintWriter</code> object to return the response,
     * set the content type before accessing the
     * <code>PrintWriter</code> object.
     * <p/>
     * <p>The servlet container must write the headers before
     * committing the response, because in HTTP the headers must be sent
     * before the response body.
     * <p/>
     * <p>Where possible, set the Content-Length header (with the
     * {@link javax.servlet.ServletResponse#setContentLength} method),
     * to allow the servlet container to use a persistent connection
     * to return its response to the client, improving performance.
     * The content length is automatically set if the entire response fits
     * inside the response buffer.
     * <p/>
     * <p>The GET method should be safe, that is, without
     * any side effects for which users are held responsible.
     * For example, most form queries have no side effects.
     * If a client request is intended to change stored data,
     * the request should use some other HTTP method.
     * <p/>
     * <p>The GET method should also be idempotent, meaning
     * that it can be safely repeated. Sometimes making a
     * method safe also makes it idempotent. For example,
     * repeating queries is both safe and idempotent, but
     * buying a product online or modifying data is neither
     * safe nor idempotent.
     * <p/>
     * <p>If the request is incorrectly formatted, <code>doGet</code>
     * returns an HTTP "Bad Request" message.
     *
     * @param req  an {@link javax.servlet.http.HttpServletRequest} object that
     *             contains the request the client has made
     *             of the servlet
     * @param resp an {@link javax.servlet.http.HttpServletResponse} object that
     *             contains the response the servlet sends
     *             to the client
     * @throws java.io.IOException            if an input or output error is
     *                                        detected when the servlet handles
     *                                        the GET request
     * @throws javax.servlet.ServletException if the request for the GET
     *                                        could not be handled
     * @see javax.servlet.ServletResponse#setContentType
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);    //To change body of overridden methods use File | Settings | File Templates.
    }

    /**
     * Called by the servlet container to indicate to a servlet that the
     * servlet is being placed into service.  See {@link javax.servlet.Servlet#init}.
     * <p/>
     * <p>This implementation stores the {@link javax.servlet.ServletConfig}
     * object it receives from the servlet container for alter use.
     * When overriding this form of the method, call
     * <code>super.init(config)</code>.
     *
     * @param config the <code>ServletConfig</code> object
     *               that contains configutation
     *               information for this servlet
     * @throws javax.servlet.ServletException if an exception occurs that
     *                                        interrupts the servlet's normal
     *                                        operation
     * @see javax.servlet.UnavailableException
     */
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);    //To change body of overridden methods use File | Settings | File Templates.
    }

    /**
     * Returns the name of this servlet instance.
     * See {@link javax.servlet.ServletConfig#getServletName}.
     *
     * @return the name of this servlet instance
     */
    @Override
    public String getServletName() {
        return super.getServletName();    //To change body of overridden methods use File | Settings | File Templates.
    }

    /**
     * Returns this servlet's {@link javax.servlet.ServletConfig} object.
     *
     * @return ServletConfig     the <code>ServletConfig</code> object
     *         that initialized this servlet
     */
    @Override
    public ServletConfig getServletConfig() {
        return super.getServletConfig();    //To change body of overridden methods use File | Settings | File Templates.
    }

    /**
     * Returns a reference to the {@link javax.servlet.ServletContext} in which this servlet
     * is running.  See {@link javax.servlet.ServletConfig#getServletContext}.
     * <p/>
     * <p>This method is supplied for convenience. It gets the
     * context from the servlet's <code>ServletConfig</code> object.
     *
     * @return ServletContext     the <code>ServletContext</code> object
     *         passed to this servlet by the <code>init</code>
     *         method
     */
    @Override
    public ServletContext getServletContext() {
        return super.getServletContext();    //To change body of overridden methods use File | Settings | File Templates.
    }
}
