public class TestExample {

    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            System.out.println(i);
        }

        int result = calculate(10, 20, 30, 40);
        System.out.println(result);
    }

    public static int calculate(int a, int b, int c, int d) {
        int x = 42;
        return a + b + c + d + x;
    }
}
