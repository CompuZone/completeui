/**
 * User: Eric Buitenhuis 
 * Date: Jun 21, 2008
 * Time: 10:38:25 AM
 */

package com.nitobi.beans.tree;

/**
 * TreeNode
 *
 * @author Eric Buitenhuis
 * @version 1.0
 */
//public class TreeNode extends Record implements Comparable{
//
//    private static Logger logger = Logger.getLogger(TreeNode.class.getName());
//
//    private Long id = null;
//    private String label = null;
//    private String nodeType = null;
//    private String hasChildren = null;
//    private String url = null;
//    private String flag = null;
//    private Map<Comparator<TreeNode>, TreeNode> children = Collections.synchronizedMap(new TreeMap<Comparator<TreeNode>, TreeNode>());
//
//    public void putChild(TreeNode treeNode) {
//        this.children.put((Comparator)treeNode, treeNode);
//    }
//
//    public void removeChild(TreeNode treeNode) {
//        this.children.remove((Comparator)treeNode);
//    }
//
//    public Map<Comparator<TreeNode>, TreeNode> getChildren() {
//        return children;
//    }
//
//    public void setChildren(Map<Comparator<TreeNode>, TreeNode> children) {
//        this.children = children;
//    }
//
//    public String getFlag() {
//        return flag;
//    }
//
//    public void setFlag(String flag) {
//        this.flag = flag;
//    }
//
//    public String getHasChildren() {
//        return hasChildren;
//    }
//
//    public void setHasChildren(String hasChildren) {
//        this.hasChildren = hasChildren;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getLabel() {
//        return label;
//    }
//
//    public void setLabel(String label) {
//        this.label = label;
//    }
//
//    public String getNodeType() {
//        return nodeType;
//    }
//
//    public void setNodeType(String nodeType) {
//        this.nodeType = nodeType;
//    }
//
//    public String getUrl() {
//        return url;
//    }
//
//    public void setUrl(String url) {
//        this.url = url;
//    }
//
//    /**
//     * Compares this object with the specified object for order.  Returns a
//     * negative integer, zero, or a positive integer as this object is less
//     * than, equal to, or greater than the specified object.<p>
//     * <p/>
//     * In the foregoing description, the notation
//     * <tt>sgn(</tt><i>expression</i><tt>)</tt> designates the mathematical
//     * <i>signum</i> function, which is defined to return one of <tt>-1</tt>,
//     * <tt>0</tt>, or <tt>1</tt> according to whether the value of <i>expression</i>
//     * is negative, zero or positive.
//     * <p/>
//     * The implementor must ensure <tt>sgn(x.compareTo(y)) ==
//     * -sgn(y.compareTo(x))</tt> for all <tt>x</tt> and <tt>y</tt>.  (This
//     * implies that <tt>x.compareTo(y)</tt> must throw an exception iff
//     * <tt>y.compareTo(x)</tt> throws an exception.)<p>
//     * <p/>
//     * The implementor must also ensure that the relation is transitive:
//     * <tt>(x.compareTo(y)&gt;0 &amp;&amp; y.compareTo(z)&gt;0)</tt> implies
//     * <tt>x.compareTo(z)&gt;0</tt>.<p>
//     * <p/>
//     * Finally, the implementer must ensure that <tt>x.compareTo(y)==0</tt>
//     * implies that <tt>sgn(x.compareTo(z)) == sgn(y.compareTo(z))</tt>, for
//     * all <tt>z</tt>.<p>
//     * <p/>
//     * It is strongly recommended, but <i>not</i> strictly required that
//     * <tt>(x.compareTo(y)==0) == (x.equals(y))</tt>.  Generally speaking, any
//     * class that implements the <tt>Comparable</tt> interface and violates
//     * this condition should clearly indicate this fact.  The recommended
//     * language is "Note: this class has a natural ordering that is
//     * inconsistent with equals."
//     *
//     * @param o the Object to be compared.
//     * @return a negative integer, zero, or a positive integer as this object
//     *         is less than, equal to, or greater than the specified object.
//     * @throws ClassCastException if the specified object's type prevents it
//     *                            from being compared to this Object.
//     */
//    public int compareTo(Object o) {
//        TreeNode incoming;
//        try {
//            incoming = (TreeNode)o;
//        } catch(ClassCastException e) {
//            logger.severe("A TreeNode can only be compared to another TreeNode.");
//            throw new IllegalStateException("A TreeNode can only be compared to another TreeNode.");
//        }
//        return this.id.compareTo(incoming.getId());
//    }
//}
